import { apiFactoryWithNamespace } from '../apiProxy';
const javaboots = apiFactoryWithNamespace('app.logancloud.com', 'v1', 'javaboots', true);
const webboots = apiFactoryWithNamespace('app.logancloud.com', 'v1', 'webboots', true);
const phpboots = apiFactoryWithNamespace('app.logancloud.com', 'v1', 'phpboots', true);
const pythonboots = apiFactoryWithNamespace('app.logancloud.com', 'v1', 'pythonboots', true);
const nodejsboots = apiFactoryWithNamespace('app.logancloud.com', 'v1', 'nodejsboots', true);

const bootApis = {
    javaboots,
    webboots,
    phpboots,
    pythonboots,
    nodejsboots,
};

export default bootApis;