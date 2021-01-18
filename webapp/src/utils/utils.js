import * as types from '@/store/mutation-types';
import { store } from '@/store';

// Catches error connection or any other error (checks if error.response exists)
export const handleError = (error, commit, reject) => {
    console.log(error);
    let errMsg = '';
    // Resets errors in store
    commit(types.SHOW_LOADING, false);
    commit(types.ERROR, null);

    // Checks if unauthorized
    const unauthorized = 401;
    if (error.response && error.response.status === unauthorized) {
        store.dispatch('logout');
    } else {
        errMsg = 'Fehler beim Ausführen';
        setTimeout(() => {
            return errMsg ? commit(types.ERROR, errMsg) : commit(types.SHOW_ERROR, false);
        }, 0);
    }
    if (reject) reject(error);
};

export const buildSuccess = (msg, commit, resolve, resolveParam = undefined) => {
    commit(types.SHOW_LOADING, false);
    commit(types.SUCCESS, null);
    setTimeout(() => {
        return msg ? commit(types.SUCCESS, msg) : commit(types.SHOW_SUCCESS, false);
    }, 0);
    commit(types.ERROR, null);
    if (resolve) resolve(resolveParam);
};

export const extractKey = input => {
    if (input.startsWith('SYSVAR|')) {
        return input.replace('SYSVAR|', '');
    } else if (input.startsWith('CHANNEL')) {
        return input.substring(input.lastIndexOf('|') + 1);
    } else if (input.startsWith('PROGRAM|')) {
        return input.replace('PROGRAM|', '');
    } else if (input.startsWith('DATA')) {
        return input.substring(input.lastIndexOf('|') + 1);
    }
    return input;
};

export const extractType = input => {
    var start, end;
    if (input.startsWith('SYSVAR|')) return 'SYSVAR';
    else if (input.startsWith('PROGRAM|')) return 'PROGRAM';
    else if (input.startsWith('CHANNEL:')) {
        start = input.indexOf('CHANNEL:') + 'CHANNEL:'.length;
        end = input.indexOf('|', start);
        return input.substring(start, end);
    }
    else if (input.startsWith('DATA:')) {
        start = input.indexOf('DATA:') + 'DATA:'.length;
        end = input.indexOf('|', start);
        return input.substring(start, end);
    }
    return input;
};
