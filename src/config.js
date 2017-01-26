const serviceImagePath_dev = 'http://192.168.9.241';
const serviceImagePath_uat = 'http://star-test.cdpyun.com';
const serviceImagePath_pro = 'http://star.cdpyun.com';

const sevice_suffix_dev = '/sme/ws.php';
const sevice_suffix_pro = '/ws.php'

const servicePath_dev = serviceImagePath_dev+sevice_suffix_dev;
const servicePath_uat = serviceImagePath_uat+sevice_suffix_pro;
const servicePath_pro = serviceImagePath_pro+sevice_suffix_pro;

export const servicePath = servicePath_uat;
export const serviceImagePath = serviceImagePath_uat;
export const appVersion = '2.0.0';

export const assetsPublicPath = process.env.NODE_ENV === 'development' ?'':window.location.pathname.replace('index.html','');//build发布修改名称为对应的根目录下/epPortal/



