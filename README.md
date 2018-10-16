# EOS Knights
小程序复刻版EOS Knights

## 接口
### 1. 查询指定项目属性
#### 接口功能
> 获取合约类型
#### URL
> [http://localhost:8080/api/rules](http://localhost:8080/api/rules)
#### HTTP请求方式
> GET
#### 请求参数
无
#### 返回字段
```
{
  "rows": [{
    "rule": "item",
    "version": 2
  }, {
    "rule": "itemlv",
    "version": 1
  }, {
    "rule": "itemset",
    "version": 1
  }, {
    "rule": "ivnprice",
    "version": 3
  }, {
    "rule": "knt",
    "version": 1
  }, {
    "rule": "kntlv",
    "version": 1
  }, {
    "rule": "kntprice",
    "version": 3
  }, {
    "rule": "material",
    "version": 2
  }, {
    "rule": "mpgoods",
    "version": 1
  }, {
    "rule": "pet",
    "version": 1
  }, {
    "rule": "petexp",
    "version": 1
  }, {
    "rule": "petlv",
    "version": 1
  }, {
    "rule": "rpetexp",
    "version": 1
  }, {
    "rule": "stage",
    "version": 1
  }, {
    "rule": "variable",
    "version": 11
  }],
  "more": false
}
```
