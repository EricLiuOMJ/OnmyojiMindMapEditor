# 配置表

::: info 说明
式神配置顺序自上而下
:::

## 1-5

### [1] 面灵气

<ShikigamiDisplay
  shikigami="面灵气"
  order=1
  description='155'
  :yuhun="['散件']"
  target="速度"
  :positions="{
    second: '速度',
  }"
  infoText="越快越好，四号位最好是抵抗"
/>

### [2] 大夜摩天阎魔

<ShikigamiDisplay
  shikigami="大夜摩天阎魔"
  order=2
  :yuhun="['散件']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '命中',
    sixth: '生命/防御',
  }"
  :parameters="{
    speed: '278+',
  }"
  infoText="御魂速度155+，不然只需要阎魔"
/>

### [3] 阎魔

<ShikigamiDisplay
  shikigami="阎魔"
  description='151'
  order=3
  :yuhun="['散件','遗念火']"
  target="速度"
  :positions="{
    second: '速度',
  }"
  infoText="越快越好，四号位最好是命中，有遗念火满速可以选择遗念火"
/>

### [4] 鬼金羊

<ShikigamiDisplay
  shikigami="鬼金羊"
  description='155'
  order=4
  :yuhun="['招财猫','火灵','散件']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '命中',
    sixth: '生命',
  }"
  :parameters="{
    speed: '272+',
  }"
  infoText="做不出来的话不做"
/>

### [5] 禅心云外镜

<ShikigamiDisplay
  shikigami="禅心云外镜"
  order=5
  :yuhun="['招财猫', '火灵', '木魅']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '生命/抵抗/防御',
    sixth: '生命/防御',
  }"
  infoText="至少一个生命位，越快越好，禅镜和鬼金羊都做的话，一个火灵位一个招财位"
/>

## 6-10

### [6] 天剑韧心鬼切

<ShikigamiDisplay
  shikigami="天剑韧心鬼切"
  order=6
  :yuhun="['薙魂']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '攻击/生命/防御',
    sixth: '攻击/生命/防御',
  }"
  :parameters="{
    speed: '258+',
  }"
  infoText="至少一个攻击位，越快越好"
/>

### [7] 千姬

<ShikigamiDisplay
  shikigami="千姬"
  order=7
  :yuhun="['共潜']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '攻击/生命/防御',
    sixth: '攻击/生命/防御',
  }"
  :parameters="{
    speed: '258+',
  }"
  infoText="至少一个攻击位，越快越好"
/>

### [8] 帝释天

<ShikigamiDisplay
  shikigami="帝释天"
  order=8
  description="155"
  :yuhun="['火灵']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '命中',
    sixth: '生命',
  }"
  infoText="越快越好"
/>

### [9] 铃鹿御前

<ShikigamiDisplay
  shikigami="铃鹿御前"
  order=9
  description="155"
  :yuhun="['招财猫', '遗念火']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '生命/抵抗/防御',
    sixth: '生命/防御',
  }"
  infoText="至少一个生命位，四号位最好是抵抗，越快越好"
/>

### [10] 初音未来

<ShikigamiDisplay
  shikigami="初音未来"
  order=10
  description="555"
  :yuhun="['火灵']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '生命/抵抗/防御',
    sixth: '生命/防御',
  }"
  infoText="至少一个生命位，四号位最好是抵抗，越快越好"
/>

## 11-15

### [11] 纺愿缘结神

<ShikigamiDisplay
  shikigami="纺愿缘结神"
  order=11
  description="515"
  :yuhun="['招财猫', '遗念火']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '生命/抵抗/防御',
    sixth: '生命/防御',
  }"
  infoText="至少一个生命位，四号位最好是抵抗，越快越好"
/>

### [12] 遥念烟烟罗

<ShikigamiDisplay
  shikigami="遥念烟烟罗"
  order=12
  description="155"
  :yuhun="['钟灵']"
  target="命中"
  :positions="{
    second: '速度',
    fourth: '命中',
    sixth: '生命',
  }"
  :parameters="{
    speed: '245+',
  }"
  infoText="控制御魂都可以（魅妖、魍魉之匣、雪幽魂、反枕）"
/>

### [13] 鲸汐千姬

<ShikigamiDisplay
  shikigami="鲸汐千姬"
  order=13
  description="155"
  :yuhun="['木魅', '蚌精']"
  target="生命"
  :positions="{
    second: '速度',
    fourth: '生命',
    sixth: '生命',
  }"
  :parameters="{
    speed: '240+',
  }"
  infoText="速度高于封阳君、言灵，带防御两件套"
/>

### [14] 封阳君

<ShikigamiDisplay
  shikigami="封阳君"
  order=14
  description="555"
  :yuhun="['雪幽魂']"
  target="命中"
  :positions="{
    second: '速度',
    fourth: '命中',
    sixth: '生命',
  }"
  :parameters="{
    speed: '240+',
  }"
  infoText="控制御魂都可以（魅妖、魍魉之匣、钟灵、反枕），命中差不多选抵抗高的"
/>

### [15] 言灵

<ShikigamiDisplay
  shikigami="言灵"
  order=15
  description="555"
  :yuhun="['木魅']"
  target="抵抗"
  :positions="{
    second: '速度',
    fourth: '抵抗',
    sixth: '生命',
  }"
  :parameters="{
    speed: '210+',
  }"
  infoText="带防御两件套"
/>

## 16-20

### [16] 月读

<ShikigamiDisplay
  shikigami="月读"
  order=16
  description="555"
  :yuhun="['招财猫']"
  target="生命"
  :positions="{
    second: '速度',
    fourth: '生命/防御',
    sixth: '生命/防御',
  }"
  :parameters="{
    speed: '258+',
  }"
  infoText="至少一个生命位"
/>

### [17] 流光追月神

<ShikigamiDisplay
  shikigami="流光追月神"
  order=17
  :yuhun="['薙魂', '共潜']"
  target="生命"
  :positions="{
    second: '速度',
    fourth: '生命',
    sixth: '生命',
  }"
  :parameters="{
    speed: '230+',
  }"
  infoText="比鬼吞快，带防御两件套"
/>

### [18] 鬼王酒吞童子

<ShikigamiDisplay
  shikigami="鬼王酒吞童子"
  order=18
  description="155"
  :yuhun="['奉海图']"
  target="生命"
  :positions="{
    second: '速度',
    fourth: '生命',
    sixth: '生命',
  }"
  :parameters="{
    speed: '220+',
  }"
  infoText="比追月慢，带防御两件套"
/>

### [19] 麓铭大岳丸

<ShikigamiDisplay
  shikigami="麓铭大岳丸"
  order=19
  description="155"
  :yuhun="['雪幽魂']"
  target="命中"
  :positions="{
    second: '速度',
    fourth: '命中',
    sixth: '生命',
  }"
  :parameters="{
    speed: '220+',
    resist: '30%+',
  }"
  infoText="控制御魂都可以（魅妖、魍魉之匣、钟灵、反枕），最好反堆一点抵抗"
/>

### [20] 初翎山风

<ShikigamiDisplay
  shikigami="初翎山风"
  order=20
  :yuhun="['日女巳时']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '攻击/生命/防御',
    sixth: '攻击/生命/防御',
  }"
  infoText="越快越好"
/>

## 21-25

### [21] 坂田银时

<ShikigamiDisplay
  shikigami="坂田银时"
  order=21
  description="555"
  :yuhun="['魍魉之匣']"
  target="命中"
  :positions="{
    second: '速度',
    fourth: '命中',
    sixth: '生命',
  }"
  :parameters="{
    speed: '220+'
  }"
  infoText="控制御魂都可以（魅妖、雪幽魂、钟灵、反枕）"
/>

### [22] 白藏主

<ShikigamiDisplay
  shikigami="白藏主"
  order=22
  description="155"
  :yuhun="['地藏像']"
  target="生命"
  :positions="{
    second: '速度',
    fourth: '生命',
    sixth: '生命',
  }"
  :parameters="{
    speed: '240+'
  }"
  infoText="尽量快一点"
/>

### [23] 巡音流歌

<ShikigamiDisplay
  shikigami="巡音流歌"
  order=23
  description="155"
  :yuhun="['共潜']"
  target="抵抗"
  :positions="{
    second: '速度',
    fourth: '抵抗',
    sixth: '生命',
  }"
  :parameters="{
    speed: '190+'
  }"
  infoText="带防御两件套"
/>

### [24] 伤魂鸟神启荒

<ShikigamiDisplay
  shikigami="神启荒"
  order=24
  description="555"
  :yuhun="['伤魂鸟']"
  target="伤害输出"
  :positions="{
    second: '攻击',
    fourth: '攻击',
    sixth: '爆伤',
  }"
  :parameters="{
    strike: '100%',
  }"
  infoText="有能力的话，速度尽量卡到124-126"
/>

### [25] 地藏神启荒

<ShikigamiDisplay
  shikigami="神启荒"
  order=25
  description="555"
  :yuhun="['地藏像']"
  target="伤害输出"
  :positions="{
    second: '攻击/生命',
    fourth: '攻击/生命',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
  }"
  infoText="一个生命位和一个攻击位，面板高的优先"
/>

## 26-30

### [26] 地藏龙珏

<ShikigamiDisplay
  shikigami="龙珏"
  order=26
  description="555"
  :yuhun="['地藏像']"
  target="伤害输出"
  :positions="{
    second: '攻击/生命',
    fourth: '攻击/生命',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
    speed: '140+',
  }"
  infoText="一个生命位和一个攻击位，面板高的优先"
/>

### [27] 青女房龙珏

<ShikigamiDisplay
  shikigami="龙珏"
  order=27
  description="555"
  :yuhun="['青女房']"
  target="伤害输出"
  :positions="{
    second: '速度',
    fourth: '攻击',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
    speed: '195+',
  }"
  infoText="面板高的优先"
/>

### [28] 季

<ShikigamiDisplay
  shikigami="季"
  order=28
  description="555"
  :yuhun="['镇墓兽']"
  target="伤害输出"
  :positions="{
    second: '速度',
    fourth: '攻击',
    sixth: '爆伤',
  }"
  :parameters="{
    speed: '200+',
  }"
  infoText="-"
/>

### [29] 猫川

<ShikigamiDisplay
  shikigami="猫川"
  order=29
  description="555"
  :yuhun="['狂骨']"
  target="攻击"
  :positions="{
    second: '速度',
    fourth: '攻击',
    sixth: '攻击',
  }"
  infoText="猫川速度 小于 鬼金羊的0.7倍，并且无限接近，最好防御两件套"
/>

### [30] 心友犬神

<ShikigamiDisplay
  shikigami="心友犬神"
  order=30
  description="555"
  :yuhun="['网切']"
  target="伤害输出"
  :positions="{
    second: '攻击',
    fourth: '攻击',
    sixth: '爆伤',
  }"
  :parameters="{
    strike: '100%',
    speed: '128+',
  }"
  infoText="-"
/>

## 31-35

### [31] 隐念龙吟铃鹿御前

<ShikigamiDisplay
  shikigami="龙吟铃鹿御前"
  order=31
  description="555"
  :yuhun="['隐念']"
  target="伤害输出"
  :positions="{
    second: '攻击',
    fourth: '攻击',
    sixth: '爆伤',
  }"
  :parameters="{
    strike: '100%',
    speed: '140+',
  }"
  infoText="-"
/>

### [32] 辅助龙吟铃鹿御前

<ShikigamiDisplay
  shikigami="龙吟铃鹿御前"
  order=32
  description="555"
  :yuhun="['木魅', '轮入道']"
  target="生命"
  :positions="{
    second: '速度',
    fourth: '生命',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
    speed: '195+',
  }"
  infoText="防御两件套"
/>

### [33] 铃彦姬

<ShikigamiDisplay
  shikigami="铃彦姬"
  order=33
  description="555"
  :yuhun="['伤魂鸟']"
  target="伤害输出"
  :positions="{
    second: '攻击',
    fourth: '攻击',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
  }"
  infoText="-"
/>

### [34] 闻人翊悬

<ShikigamiDisplay
  shikigami="闻人翊悬"
  order=34
  description="555"
  :yuhun="['伤魂鸟']"
  target="伤害输出"
  :positions="{
    second: '攻击',
    fourth: '攻击',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%'
  }"
  infoText="-"
/>

### [35] 荒川之主

<ShikigamiDisplay
  shikigami="荒川之主"
  order=35
  description="555"
  :yuhun="['青女房']"
  target="伤害输出"
  :positions="{
    second: '速度',
    fourth: '攻击',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
    speed: '196+'
  }"
  infoText="-"
/>

## 36-40

### [36] 祸津神

<ShikigamiDisplay
  shikigami="祸津神"
  order=36
  description="555"
  :yuhun="['伤魂鸟']"
  target="治疗量"
  :positions="{
    second: '生命',
    fourth: '生命',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
    speed: '140+'
  }"
  infoText="-"
/>

### [37] 苍风一目连

<ShikigamiDisplay
  shikigami="苍风一目连"
  order=37
  description="555"
  :yuhun="['共潜']"
  target="伤害输出"
  :positions="{
    second: '速度',
    fourth: '攻击',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '120%',
    speed: '195+'
  }"
  infoText="-"
/>

### [38] 本真三尾狐

<ShikigamiDisplay
  shikigami="本真三尾狐"
  order=38
  description="555"
  :yuhun="['网切']"
  target="伤害输出"
  :positions="{
    second: '攻击',
    fourth: '攻击',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
    speed: '128+'
  }"
  infoText="-"
/>

### [39] 神酿星熊童子

<ShikigamiDisplay
  shikigami="神酿星熊童子"
  order=39
  description="555"
  :yuhun="['地藏像']"
  target="命中"
  :positions="{
    second: '生命',
    fourth: '命中',
    sixth: '生命',
  }"
  infoText="最好防御两件套"
/>

### [40] 孔雀明王

<ShikigamiDisplay
  shikigami="孔雀明王"
  order=40
  description="155"
  :yuhun="['返魂香']"
  target="命中"
  :positions="{
    second: '速度',
    fourth: '命中',
    sixth: '生命',
  }"
  :parameters="{
    speed: '200+'
  }"
  infoText="最好防御两件套"
/>

## 41-45

### [41] 因幡辉夜姬

<ShikigamiDisplay
  shikigami="因幡辉夜姬"
  order=41
  description="155"
  :yuhun="['蚌精']"
  target="暴击伤害"
  :positions="{
    second: '生命',
    fourth: '生命',
    sixth: '暴击伤害',
  }"
  :parameters="{
    speed: '128+'
  }"
  infoText="防御两件套"
/>

### [42] 泷

<ShikigamiDisplay
  shikigami="泷"
  order=42
  description="555"
  :yuhun="['蚌精']"
  target="治疗量"
  :positions="{
    second: '生命',
    fourth: '生命',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
  }"
  infoText="-"
/>

### [43] 一目连

<ShikigamiDisplay
  shikigami="一目连"
  order=43
   description="555"
  :yuhun="['蚌精']"
  target="治疗量"
  :positions="{
    second: '生命',
    fourth: '生命',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
    speed: '140+'
  }"
  infoText="-"
/>

### [44] 匣中少女

<ShikigamiDisplay
  shikigami="匣中少女"
  order=44
  description="555"
  :yuhun="['蚌精']"
  target="治疗量"
  :positions="{
    second: '生命',
    fourth: '生命',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
  }"
  infoText="-"
/>

### [45] 骁浪荒川之主

<ShikigamiDisplay
  shikigami="骁浪荒川之主"
  order=45
  description="555"
  :yuhun="['散件']"
  target="伤害输出"
  :positions="{
    second: '速度',
    fourth: '攻击',
    sixth: '爆伤/暴击',
  }"
  :parameters="{
    strike: '100%',
    attack: '6000+',
    speed: '200+'
  }"
  infoText="-"
/>

## 46-50

### [46] 火灵入内雀

<ShikigamiDisplay
  shikigami="入内雀"
  order=46
  description="555"
  :yuhun="['火灵']"
  target="防御"
  :positions="{
    second: '防御',
    fourth: '防御',
    sixth: '防御',
  }"
  infoText="-"
/>

### [47] 木魅入内雀

<ShikigamiDisplay
  shikigami="入内雀"
  order=47
  description="555"
  :yuhun="['木魅']"
  target="防御"
  :positions="{
    second: '防御',
    fourth: '防御',
    sixth: '防御',
  }"
  infoText="-"
/>

### [48] 木魅御馔津

<ShikigamiDisplay
  shikigami="御馔津"
  order=48
  description="111"
  :yuhun="['木魅']"
  target="抵抗"
  :positions="{
    second: '生命',
    fourth: '抵抗',
    sixth: '生命',
  }"
  :parameters="{
    speed: '<128',
    hit: '40%+',
  }"
  infoText="-"
/>

### [49] 火灵御馔津

<ShikigamiDisplay
  shikigami="御馔津"
  order=49
  description="111"
  :yuhun="['火灵']"
  target="抵抗"
  :positions="{
    second: '生命',
    fourth: '抵抗',
    sixth: '生命',
  }"
  :parameters="{
    speed: '<128',
    hit: '40%+',
  }"
  infoText="-"
/>

### [50] 不知火

<ShikigamiDisplay
  shikigami="不知火"
  order=50
  description="555"
  :yuhun="['火灵']"
  target="生命"
  :positions="{
    second: '生命',
    fourth: '生命',
    sixth: '生命',
  }"
  :parameters="{
    speed: '<128',
    defense: '850+',
  }"
  infoText="防御两件套"
/>

## 51-55

### [51] 彼岸花

<ShikigamiDisplay
  shikigami="彼岸花"
  order=51
  description="111"
  :yuhun="['钟灵']"
  target="效果命中"
  :positions="{
    second: '速度',
    fourth: '命中',
    sixth: '生命',
  }"
  :parameters="{
    speed: '190+',
  }"
  infoText="-"
/>
