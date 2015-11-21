var Payment = require('./').Payment;
var fs = require('fs');

var initConfig = {
  partnerKey: "QWWEasdaaQW2EQWE1231234KOIJJD487",
  appId: "wxcc9ddceda48cd1dc",
  mchId: "10016389",
  notifyUrl: "http://wechat.ccmeiche.com/wechat/notify",
  pfx: fs.readFileSync("/Users/spud/Projects/wechat-pay/apiclient_cert.p12")
};


var payment = new Payment(initConfig);

var order = {
  body: '吮指原味鸡 * 1',
  attach: '{"部位":"三角"}',
  out_trade_no: 'kfc001',
  total_fee: 10 * 100,
  spbill_create_ip: "127.0.0.1",
  openid: "ofgxpuEA11o7f121X8PHq3eO7WkM",
  trade_type: 'JSAPI'
};

payment.getBrandWCPayRequestParams(order, function(err, payargs){
  console.log(err, payargs);
});