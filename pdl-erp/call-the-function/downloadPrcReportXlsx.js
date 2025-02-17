﻿const { downloadPrcReport } = require('../function-definition/prcReport.js');
const os = require('os');
const path = require('path');

const downloadPath = path.join(os.homedir(), 'Downloads');
downloadPrcReport('https://pdlerpweb.pioneerdenim.com/RptCustoms/PRCReport', 'PrcReport', 'xlsx', downloadPath);