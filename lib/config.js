
var fileHost = "https://fhh20181219.oss-cn-qingdao.aliyuncs.com";
var config = {
  uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
  AccessKeySecret: 'YKwRF9brUkFh9hHknlnckShLPJPf8Y',       
  OSSAccessKeyId: 'LTAIIyfPm36MuRGa',        
  timeout: 80000 //这个是上传文件时Policy的失效时间
};

module.exports = config;