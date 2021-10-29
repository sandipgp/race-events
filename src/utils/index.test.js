import {isLogin, getToken} from './index';

test('isLogin to return true /false', () => {
    expect(isLogin(getToken())).toBe(false);
})
