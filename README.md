# EOS Knights
小程序复刻版EOS Knights

## 类
#### 1. Stage
#### 2. Knight
#### 3. Monster
#### 4. Material
#### 5. Item
#### 6. Pet

## 内置规则
### 1. 场景概率
### 2. 重生获得道具概率计算
### 3. 掉落率
### 4. 道具合成规则
### 5. 宠物抽取概率
### 6. 宠物类型和属性
### 7. 宠物远征获得物品概率和计算



## 接口
### 1. 获取合约类型
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

### 2. 获取EOS帐号状态
#### 接口功能
> 获取EOS帐号状态
#### URL
> [http://localhost:8080/api/account](http://localhost:8080/api/account)
#### HTTP请求方式
> GET
#### 请求参数
```
{account_name: "zhaojian1111"}
```
#### 返回字段
```
{"account_name":"zhaojian1111","head_block_num":21903034,"head_block_time":"2018-10-16T13:15:20.500","privileged":false,"last_code_update":"1970-01-01T00:00:00.000","created":"2018-08-24T11:10:43.000","core_liquid_balance":"393.5909 EOS","ram_quota":9837,"net_weight":500,"cpu_weight":104142,"net_limit":{"used":5338,"available":28603,"max":33941},"cpu_limit":{"used":43379,"available":0,"max":6083},"ram_usage":4166,"permissions":[{"perm_name":"active","parent":"owner","required_auth":{"threshold":1,"keys":[{"key":"EOS5eNZfmvjE9gv3y1QRSAxde45XFC487E2jgktf3rFHpg8EHiMZj","weight":1}],"accounts":[],"waits":[]}},{"perm_name":"owner","parent":"","required_auth":{"threshold":1,"keys":[{"key":"EOS8HCJGS7nFMRFoxymc67oKimEkNKd84JfaJMsSeS4SXCCWvxQiy","weight":1}],"accounts":[],"waits":[]}}],"total_resources":{"owner":"zhaojian1111","net_weight":"0.0500 EOS","cpu_weight":"10.4142 EOS","ram_bytes":8437},"self_delegated_bandwidth":{"from":"zhaojian1111","to":"zhaojian1111","net_weight":"0.0500 EOS","cpu_weight":"10.4142 EOS"},"refund_request":null,"voter_info":{"owner":"zhaojian1111","proxy":"","producers":[],"staked":104642,"last_vote_weight":"0.00000000000000000","proxied_vote_weight":"0.00000000000000000","is_proxy":0}}
```

### 3. 获取玩家状态
#### 接口功能
> 获取玩家状态
#### URL
> [http://localhost:8080/api/player](http://localhost:8080/api/player)
#### HTTP请求方式
> GET
#### 请求参数
```
{account_name: "zhaojian1111"}
```
#### 返回字段
```
{
  "rows": [{
    "owner": "zhaojian1111",
    "mat_ivn_up": 0,
    "item_ivn_up": 1,
    "current_stage": 8,
    "last_rebirth": 39561794,
    "powder": 1872,
    "maxfloor": 347
  }],
  "more": true
}
```

### 4. 获取玩家推广信息
#### 接口功能
> 获取玩家推广信息
#### URL
> [http://localhost:8080/api/referral](http://localhost:8080/api/referral)
#### HTTP请求方式
> GET
#### 请求参数
```
{account_name: "zhaojian1111"}
```
#### 返回字段
```
{
  "rows": [{
    "owner": "zhaojian1111",
    "from": 3668565944,
    "to": 3550520882,
    "referral": 130,
    "v4": 0,
    "gift": 4,
    "asset": 0,
    "note": 2720165129,
    "data": 2499084365,
    "net": 0,
    "cpu": 0
  }],
  "more": true
}
```

### 5. 获取玩家材料
#### 接口功能
> 获取玩家材料
#### URL
> [http://localhost:8080/api/materials](http://localhost:8080/api/materials)
#### HTTP请求方式
> GET
#### 请求参数
```
{account_name: "zhaojian1111"}
```
#### 返回字段
```
{
  "rows": [{
    "owner": "zhaojian1111",
    "last_id": 1264,
    "rows": [{
      "id": 1193,
      "code": 87,
      "saleid": 0
    }]
  }],
  "more": true
}
```

### 6. 获取玩家装备
#### 接口功能
> 获取玩家装备
#### URL
> [http://localhost:8080/api/items](http://localhost:8080/api/items)
#### HTTP请求方式
> GET
#### 请求参数
```
{account_name: "zhaojian1111"}
```
#### 返回字段
```
{
  "rows": [{
    "owner": "zhaojian1111",
    "rows": [{
      "code": 2,
      "count": 3,
      "level": 2,
      "knight": 0
    }]
  }],
  "more": true
}
```

### 7. 获取玩家宠物
#### 接口功能
> 获取玩家宠物
#### URL
> [http://localhost:8080/api/pets](http://localhost:8080/api/pets)
#### HTTP请求方式
> GET
#### 请求参数
```
{account_name: "zhaojian1111"}
```
#### 返回字段


### 8. 获取宠物远征信息
#### 接口功能
> 获取宠物远征信息
#### URL
> [http://localhost:8080/api/petexp](http://localhost:8080/api/petexp)
#### HTTP请求方式
> GET
#### 请求参数
```
{account_name: "zhaojian1111"}
```
#### 返回字段
```
{
  "rows": [{
    "owner": "zhaojian1111",
    "v1": 0,
    "v2": 0,
    "rows": [{
      "code": 2,
      "start": 39532905,
      "end": 39590615,
      "isback": 1
    }]
  }],
  "more": true
}
```

### 9. 获取玩家英雄
#### 接口功能
> 获取玩家英雄
#### URL
> [http://localhost:8080/api/knights](http://localhost:8080/api/knights)
#### HTTP请求方式
> GET
#### 请求参数
```
{account_name: "zhaojian1111"}
```
#### 返回字段
```
{
  "rows": [{
    "owner": "zhaojian1111",
    "rows": [{
      "type": 2,
      "level": 9,
      "kill_count": 149798,
      "attack": 2155,
      "defense": 652,
      "hp": 1950,
      "luck": 163
    }, {
      "type": 1,
      "level": 12,
      "kill_count": 140994,
      "attack": 1960,
      "defense": 550,
      "hp": 1838,
      "luck": 298
    }, {
      "type": 3,
      "level": 9,
      "kill_count": 129439,
      "attack": 1874,
      "defense": 822,
      "hp": 1640,
      "luck": 187
    }]
  }],
  "more": true
}
```

### 10. 最近材料价格
#### 接口功能
> 最近材料价格
#### URL
> [http://localhost:8080/api/materials-price](http://localhost:8080/api/materials-price)
#### HTTP请求方式
> GET
#### 请求参数
无
#### 返回字段
```
{
  "latest": [{
    "price": 0.001,
    "code": 101
  }]
}
```

### 11. 最近装备价格
#### 接口功能
> 最近装备价格
#### URL
> [http://localhost:8080/api/items-price](http://localhost:8080/api/items-price)
#### HTTP请求方式
> GET
#### 请求参数
无
#### 返回字段
```
{
  "latest": [{
    "price": 0.001,
    "code": 101
  }]
}
```

### 12. 在卖的材料/装备
#### 接口功能
> 在卖的材料
#### URL
> [http://localhost:8080/api/selling-materials](http://localhost:8080/api/selling-materials)
#### HTTP请求方式
> GET
#### 请求参数
```
{
  "code": 1,
  "from": 0,
  "grade": null,
  "size": 24,
  "sortDirection": "ASC",
  "sortProperty": "price",
  "status": "Sell",
  "type": null
}
```
#### 返回字段
```
{
  "content": [{
    "id": 322463,
    "cid": 335159,
    "player": "eosbtcethbch",
    "buyer": null,
    "price": "0.001",
    "grade": "Normal",
    "type": "Nature",
    "saleFrom": null,
    "code": 1,
    "status": "Sell",
    "created": 1539706931000,
    "updated": 1539706931000
  }],
  "pageable": {
    "offset": 0,
    "sort": {
      "sorted": true,
      "unsorted": false
    },
    "pageSize": 24,
    "pageNumber": 0,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalElements": 13,
  "totalPages": 1,
  "sort": {
    "sorted": true,
    "unsorted": false
  },
  "first": true,
  "numberOfElements": 13,
  "size": 24,
  "number": 0
}
```

### 13. 重生
#### 接口功能
> 重生
#### URL
> [http://localhost:8080/api/rebirth](http://localhost:8080/api/rebirth)
#### HTTP请求方式
> POST
#### 请求参数
```
{account_name: "zhaojian1111"}
```
#### 返回字段

### 14. 删除材料
#### 接口功能
> 删除材料
#### URL
> [http://localhost:8080/api/remove-materials](http://localhost:8080/api/remove-materials)
#### HTTP请求方式
> POST
#### 请求参数
```

```
#### 返回字段

### 15. 删除装备
#### 接口功能
> 删除装备
#### URL
> [http://localhost:8080/api/remove-items](http://localhost:8080/api/remove-items)
#### HTTP请求方式
> POST
#### 请求参数
```

```
#### 返回字段

### 16. 出售材料/装备
#### 接口功能
> 删除装备
#### URL
> [http://localhost:8080/api/sell-material](http://localhost:8080/api/sell-material)
#### HTTP请求方式
> POST
#### 请求参数
```

```
#### 返回字段

### 17. 宠物远征
#### 接口功能
> 宠物远征
#### URL
> [http://localhost:8080/api/petexp](http://localhost:8080/api/petexp)
#### HTTP请求方式
> POST
#### 请求参数
```

```
#### 返回字段

### 18. 宠物远征返回
#### 接口功能
> 宠物远征返回
#### URL
> [http://localhost:8080/api/pet-return](http://localhost:8080/api/pet-return)
#### HTTP请求方式
> POST
#### 请求参数
```

```
#### 返回字段

### 19. 抽取宠物
#### 接口功能
> 抽取宠物
#### URL
> [http://localhost:8080/api/pet-gacha](http://localhost:8080/api/pet-gacha)
#### HTTP请求方式
> POST
#### 请求参数
```

```
#### 返回字段

### 20. 道具合成
#### 接口功能
> 道具合成
#### URL
> [http://localhost:8080/api/items-combine](http://localhost:8080/api/items-combine)
#### HTTP请求方式
> POST
#### 请求参数
```

```
#### 返回字段

### 21. 道具升级
#### 接口功能
> 道具合成
#### URL
> [http://localhost:8080/api/items-upgrade](http://localhost:8080/api/items-upgrade)
#### HTTP请求方式
> POST
#### 请求参数
```

```
#### 返回字段