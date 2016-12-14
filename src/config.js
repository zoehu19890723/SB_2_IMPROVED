export const assetsPublicPath = process.env.NODE_ENV === 'development' ?'':window.location.pathname.replace('index.html','')//build发布修改名称为对应的根目录下/epPortal/
export const API_ROOT = process.env.NODE_ENV === 'development' ? 'http://epdemo.cdpyun.com/':'http://epdemo.cdpyun.com/'


