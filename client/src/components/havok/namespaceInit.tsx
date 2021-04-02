import * as cookie from 'js-cookie';

export default function InitNamespace(){
    const namespaceCookie = cookie.get('Namespace')
    if (namespaceCookie) {
        localStorage.namespace = namespaceCookie;
        cookie.remove('Namespace');
    }
}