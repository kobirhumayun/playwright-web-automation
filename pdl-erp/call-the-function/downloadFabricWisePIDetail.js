const { downloadFabricWisePIDetail } = require('../function-definition/fabricWisePIDetail.js');
const os = require('os');
const path = require('path');

const downloadPath = path.join(os.homedir(), 'Downloads');

downloadFabricWisePIDetail('https://pdlerp.pioneerdenim.com/RptCustoms/FabricWisePIDetail', 'PIReport', 'xlsx', downloadPath);
