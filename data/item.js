// http://kancolle-calc.net/deckbuilder.html 様より失敬
var e_data = [{"id":1,"name":"12cm単装砲","type":[1,1,1,1,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":0,"dismantle":"[0,1,1,0]"}
,{"id":2,"name":"12.7cm連装砲","type":[1,1,1,1,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":0,"dismantle":"[0,1,2,0]"}
,{"id":3,"name":"10cm連装高角砲","type":[1,1,1,16,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":1,"dismantle":"[0,1,3,0]"}
,{"id":4,"name":"14cm単装砲","type":[1,1,2,2,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":0,"seek":0,"range":2,"rarity":0,"dismantle":"[0,2,1,0]"}
,{"id":5,"name":"15.5cm三連装砲","type":[1,1,2,2,0],"armor":0,"fire":7,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":1,"evasion":0,"seek":0,"range":2,"rarity":0,"dismantle":"[0,2,5,0]"}
,{"id":6,"name":"20.3cm連装砲","type":[1,1,2,2,0],"armor":0,"fire":8,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":0,"evasion":0,"seek":0,"range":2,"rarity":0,"dismantle":"[0,3,4,0]"}
,{"id":7,"name":"35.6cm連装砲","type":[1,1,3,3,0],"armor":0,"fire":15,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":0,"evasion":0,"seek":0,"range":3,"rarity":0,"dismantle":"[0,10,15,0]"}
,{"id":8,"name":"41cm連装砲","type":[1,1,3,3,0],"armor":0,"fire":20,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":0,"evasion":0,"seek":0,"range":3,"rarity":1,"dismantle":"[0,12,20,0]"}
,{"id":9,"name":"46cm三連装砲","type":[1,1,3,3,0],"armor":0,"fire":26,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":0,"evasion":0,"seek":0,"range":4,"rarity":2,"dismantle":"[0,24,25,0]"}
,{"id":10,"name":"12.7cm連装高角砲","type":[1,2,4,16,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":1,"evasion":0,"seek":0,"range":1,"rarity":0,"dismantle":"[0,2,2,0]"}
,{"id":11,"name":"15.2cm単装砲","type":[1,2,4,4,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":0,"seek":0,"range":2,"rarity":0,"dismantle":"[0,2,2,0]"}
,{"id":12,"name":"15.5cm三連装副砲","type":[1,2,4,4,0],"armor":0,"fire":7,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":2,"evasion":0,"seek":0,"range":2,"rarity":1,"dismantle":"[0,2,5,0]"}
,{"id":13,"name":"61cm三連装魚雷","type":[2,3,5,5,0],"armor":0,"fire":0,"torpedo":5,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":0,"dismantle":"[1,1,1,0]"}
,{"id":14,"name":"61cm四連装魚雷","type":[2,3,5,5,0],"armor":0,"fire":0,"torpedo":7,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":0,"dismantle":"[1,2,2,0]"}
,{"id":15,"name":"61cm四連装(酸素)魚雷","type":[2,3,5,5,0],"armor":0,"fire":0,"torpedo":10,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":1,"dismantle":"[2,2,2,0]"}
,{"id":16,"name":"九七式艦攻","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":5,"bomb":0,"aac":0,"ass":4,"hit":0,"evasion":0,"seek":1,"range":0,"rarity":0,"dismantle":"[1,1,0,2]"}
,{"id":17,"name":"天山","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":7,"bomb":0,"aac":0,"ass":3,"hit":0,"evasion":0,"seek":1,"range":0,"rarity":1,"dismantle":"[2,4,0,4]"}
,{"id":18,"name":"流星","type":[3,5,8,8,33],"armor":0,"fire":0,"torpedo":10,"bomb":0,"aac":1,"ass":4,"hit":0,"evasion":0,"seek":1,"range":0,"rarity":2,"dismantle":"[2,5,0,10]"}
,{"id":19,"name":"九六式艦戦","type":[3,5,6,6,11],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":0,"dismantle":"[1,1,0,1]"}
,{"id":20,"name":"零式艦戦21型","type":[3,5,6,6,11],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":0,"dismantle":"[1,1,0,2]"}
,{"id":21,"name":"零式艦戦52型","type":[3,5,6,6,12],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":1,"dismantle":"[1,2,0,3]"}
,{"id":22,"name":"試製烈風 後期型","type":[3,5,6,6,13],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[2,2,0,9]"}
,{"id":23,"name":"九九式艦爆","type":[3,5,7,7,15],"armor":0,"fire":0,"torpedo":0,"bomb":5,"aac":0,"ass":3,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":0,"dismantle":"[1,1,0,2]"}
,{"id":24,"name":"彗星","type":[3,5,7,7,16],"armor":0,"fire":0,"torpedo":0,"bomb":8,"aac":0,"ass":3,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":1,"dismantle":"[2,3,0,3]"}
,{"id":25,"name":"零式水上偵察機","type":[5,7,10,10,2],"armor":0,"fire":0,"torpedo":0,"bomb":1,"aac":1,"ass":2,"hit":1,"evasion":0,"seek":5,"range":0,"rarity":0,"dismantle":"[1,1,0,2]"}
,{"id":26,"name":"瑞雲","type":[5,43,11,10,32],"armor":0,"fire":0,"torpedo":0,"bomb":4,"aac":2,"ass":4,"hit":1,"evasion":0,"seek":6,"range":0,"rarity":1,"dismantle":"[2,3,0,5]"}
,{"id":27,"name":"13号対空電探","type":[5,8,12,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":1,"evasion":0,"seek":3,"range":0,"rarity":1,"dismantle":"[0,0,10,10]"}
,{"id":28,"name":"22号対水上電探","type":[5,8,12,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":3,"evasion":0,"seek":5,"range":0,"rarity":1,"dismantle":"[0,0,15,15]"}
,{"id":29,"name":"33号対水上電探","type":[5,8,12,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":5,"evasion":0,"seek":7,"range":0,"rarity":2,"dismantle":"[0,0,20,15]"}
,{"id":30,"name":"21号対空電探","type":[5,8,13,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":2,"evasion":0,"seek":4,"range":0,"rarity":2,"dismantle":"[0,0,20,20]"}
,{"id":31,"name":"32号対水上電探","type":[5,8,13,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":8,"evasion":0,"seek":10,"range":0,"rarity":3,"dismantle":"[0,0,20,25]"}
,{"id":32,"name":"42号対空電探","type":[5,8,13,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":4,"evasion":0,"seek":5,"range":0,"rarity":4,"dismantle":"[0,0,25,25]"}
,{"id":33,"name":"改良型艦本式タービン","type":[6,31,17,19,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":6,"seek":0,"range":0,"rarity":0,"dismantle":"[10,0,10,0]"}
,{"id":34,"name":"強化型艦本式缶","type":[6,31,17,19,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":10,"seek":0,"range":0,"rarity":1,"dismantle":"[10,0,20,0]"}
,{"id":35,"name":"三式弾","type":[4,28,18,12,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":0,"dismantle":"[0,9,6,3]"}
,{"id":36,"name":"九一式徹甲弾","type":[4,25,19,13,0],"armor":0,"fire":8,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":1,"dismantle":"[0,3,9,0]"}
,{"id":37,"name":"7.7mm機銃","type":[4,6,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":0,"dismantle":"[0,1,1,0]"}
,{"id":38,"name":"12.7mm単装機銃","type":[4,6,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":0,"dismantle":"[0,1,1,0]"}
,{"id":39,"name":"25mm連装機銃","type":[4,6,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":0,"dismantle":"[0,2,1,0]"}
,{"id":40,"name":"25mm三連装機銃","type":[4,6,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":1,"dismantle":"[0,3,1,0]"}
,{"id":41,"name":"甲標的 甲型","type":[2,4,22,5,0],"armor":0,"fire":0,"torpedo":12,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":1,"dismantle":"[0,7,7,0]"}
,{"id":42,"name":"応急修理要員","type":[6,30,23,14,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":0,"dismantle":"[0,0,1,0]"}
,{"id":43,"name":"応急修理女神","type":[6,30,23,14,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[0,0,1,0]"}
,{"id":44,"name":"九四式爆雷投射機","type":[7,32,15,17,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":5,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":0,"dismantle":"[0,2,1,1]"}
,{"id":45,"name":"三式爆雷投射機","type":[7,32,15,17,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":8,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[0,3,1,1]"}
,{"id":46,"name":"九三式水中聴音機","type":[7,10,14,18,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":6,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":0,"dismantle":"[0,0,1,1]"}
,{"id":47,"name":"三式水中探信儀","type":[7,10,14,18,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":10,"hit":2,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[0,0,1,2]"}
,{"id":48,"name":"12cm単装高角砲","type":[1,1,1,16,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":0,"dismantle":"[0,1,1,0]"}
,{"id":49,"name":"25mm単装機銃","type":[4,6,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":1,"dismantle":"[0,1,1,0]"}
,{"id":50,"name":"20.3cm(3号)連装砲","type":[1,1,2,2,0],"armor":0,"fire":10,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":1,"evasion":0,"seek":0,"range":2,"rarity":1,"dismantle":"[0,3,4,0]"}
,{"id":51,"name":"12cm30連装噴進砲","type":[4,29,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[0,4,2,2]"}
,{"id":52,"name":"流星改","type":[3,5,8,8,33],"armor":0,"fire":0,"torpedo":13,"bomb":0,"aac":1,"ass":3,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":3,"dismantle":"[2,6,0,10]"}
,{"id":53,"name":"烈風 一一型","type":[3,5,6,6,13],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":12,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[2,2,0,10]"}
,{"id":54,"name":"彩雲","type":[5,7,9,9,1],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":9,"range":0,"rarity":2,"dismantle":"[2,0,0,11]"}
,{"id":55,"name":"紫電改二","type":[3,5,6,6,12],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":0,"evasion":3,"seek":0,"range":0,"rarity":2,"dismantle":"[2,2,0,7]"}
,{"id":56,"name":"震電改","type":[3,5,6,6,20],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":15,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":5,"dismantle":"[2,3,0,28]"}
,{"id":57,"name":"彗星一二型甲","type":[3,5,7,7,16],"armor":0,"fire":0,"torpedo":0,"bomb":10,"aac":0,"ass":3,"hit":0,"evasion":0,"seek":1,"range":0,"rarity":2,"dismantle":"[2,3,0,4]"}
,{"id":58,"name":"61cm五連装(酸素)魚雷","type":[2,3,5,5,0],"armor":0,"fire":0,"torpedo":12,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":0,"seek":0,"range":1,"rarity":2,"dismantle":"[2,3,2,0]"}
,{"id":59,"name":"零式水上観測機","type":[5,7,10,10,2],"armor":0,"fire":0,"torpedo":0,"bomb":1,"aac":2,"ass":4,"hit":2,"evasion":0,"seek":6,"range":0,"rarity":1,"dismantle":"[1,1,0,2]"}
,{"id":60,"name":"零式艦戦62型(爆戦)","type":[3,5,7,7,12],"armor":0,"fire":0,"torpedo":0,"bomb":4,"aac":4,"ass":3,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[1,3,0,3]"}
,{"id":61,"name":"二式艦上偵察機","type":[5,7,9,9,1],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":3,"evasion":0,"seek":7,"range":0,"rarity":1,"dismantle":"[3,1,0,13]"}
,{"id":62,"name":"試製晴嵐","type":[5,43,11,10,2],"armor":0,"fire":0,"torpedo":0,"bomb":11,"aac":0,"ass":6,"hit":1,"evasion":0,"seek":6,"range":0,"rarity":4,"dismantle":"[4,5,0,20]"}
,{"id":63,"name":"12.7cm連装砲B型改二","type":[1,1,1,1,0],"armor":0,"fire":3,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":1,"dismantle":"[0,1,2,0]"}
,{"id":64,"name":"Ju87C改","type":[3,5,7,7,14],"armor":0,"fire":0,"torpedo":0,"bomb":9,"aac":0,"ass":5,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[2,4,0,5]"}
,{"id":65,"name":"15.2cm連装砲","type":[1,1,2,2,0],"armor":0,"fire":5,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":3,"evasion":0,"seek":0,"range":2,"rarity":2,"dismantle":"[0,2,3,0]"}
,{"id":66,"name":"8cm高角砲","type":[1,2,4,16,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":2,"evasion":0,"seek":0,"range":1,"rarity":3,"dismantle":"[0,1,2,0]"}
,{"id":67,"name":"53cm艦首(酸素)魚雷","type":[2,3,5,5,0],"armor":0,"fire":0,"torpedo":15,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":0,"range":1,"rarity":1,"dismantle":"[2,2,2,0]"}
,{"id":68,"name":"大発動艇","type":[8,14,24,20,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":0,"dismantle":"[1,1,0,1]"}
,{"id":69,"name":"カ号観測機","type":[3,15,25,21,53],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":9,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[1,1,0,4]"}
,{"id":70,"name":"三式指揮連絡機(対潜)","type":[3,16,26,22,54],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":7,"hit":2,"evasion":0,"seek":1,"range":0,"rarity":1,"dismantle":"[1,1,0,2]"}
,{"id":71,"name":"10cm連装高角砲(砲架)","type":[1,2,4,16,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":1,"evasion":0,"seek":0,"range":1,"rarity":3,"dismantle":"[0,1,3,0]"}
,{"id":72,"name":"増設バルジ(中型艦)","type":[6,17,27,23,0],"armor":7,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":-2,"seek":0,"range":0,"rarity":2,"dismantle":"[0,0,12,0]"}
,{"id":73,"name":"増設バルジ(大型艦)","type":[6,17,28,23,0],"armor":9,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":-3,"seek":0,"range":0,"rarity":2,"dismantle":"[0,0,30,0]"}
,{"id":74,"name":"探照灯","type":[8,18,29,24,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":0,"dismantle":"[0,0,1,1]"}
,{"id":75,"name":"ドラム缶(輸送用)","type":[9,19,30,25,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":0,"dismantle":"[0,0,1,0]"}
,{"id":76,"name":"38cm連装砲","type":[1,1,3,3,0],"armor":0,"fire":16,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":1,"evasion":0,"seek":0,"range":3,"rarity":0,"dismantle":"[0,11,18,0]"}
,{"id":77,"name":"15cm連装副砲","type":[1,2,4,4,0],"armor":0,"fire":4,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":2,"evasion":0,"seek":0,"range":2,"rarity":0,"dismantle":"[0,2,4,0]"}
,{"id":78,"name":"12.7cm単装砲","type":[1,1,1,1,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":0,"seek":0,"range":1,"rarity":0,"dismantle":"[0,1,1,0]"}
,{"id":79,"name":"瑞雲(六三四空)","type":[5,43,11,10,32],"armor":0,"fire":0,"torpedo":0,"bomb":6,"aac":2,"ass":5,"hit":1,"evasion":0,"seek":6,"range":0,"rarity":2,"dismantle":"[2,3,0,5]"}
,{"id":80,"name":"瑞雲12型","type":[5,43,11,10,32],"armor":0,"fire":0,"torpedo":0,"bomb":7,"aac":3,"ass":5,"hit":1,"evasion":0,"seek":6,"range":0,"rarity":3,"dismantle":"[2,3,0,6]"}
,{"id":81,"name":"瑞雲12型(六三四空)","type":[5,43,11,10,32],"armor":0,"fire":0,"torpedo":0,"bomb":9,"aac":3,"ass":6,"hit":1,"evasion":0,"seek":7,"range":0,"rarity":4,"dismantle":"[2,3,0,6]"}
,{"id":82,"name":"九七式艦攻(九三一空)","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":6,"bomb":0,"aac":0,"ass":7,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":2,"dismantle":"[2,3,0,4]"}
,{"id":83,"name":"天山(九三一空)","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":9,"bomb":0,"aac":0,"ass":8,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":3,"dismantle":"[2,4,0,5]"}
,{"id":84,"name":"2cm 四連装FlaK 38","type":[4,6,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[0,3,1,1]"}
,{"id":85,"name":"3.7cm FlaK M42","type":[4,6,21,15,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[0,3,1,1]"}
,{"id":86,"name":"艦艇修理施設","type":[10,20,31,26,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[10,5,20,10]"}
,{"id":87,"name":"新型高温高圧缶","type":[6,31,17,19,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":13,"seek":0,"range":0,"rarity":3,"dismantle":"[20,0,25,0]"}
,{"id":88,"name":"22号対水上電探改四","type":[5,8,12,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":2,"hit":8,"evasion":0,"seek":5,"range":0,"rarity":3,"dismantle":"[0,0,16,16]"}
,{"id":89,"name":"21号対空電探改","type":[5,8,13,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":3,"evasion":1,"seek":6,"range":0,"rarity":3,"dismantle":"[0,0,21,23]"}
,{"id":90,"name":"20.3cm(2号)連装砲","type":[1,1,2,2,0],"armor":0,"fire":9,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":1,"evasion":0,"seek":0,"range":2,"rarity":1,"dismantle":"[0,3,4,0]"}
,{"id":91,"name":"12.7cm連装高角砲(後期型)","type":[1,2,1,16,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":5,"ass":1,"hit":1,"evasion":1,"seek":0,"range":1,"rarity":1,"dismantle":"[0,2,2,0]"}
,{"id":92,"name":"毘式40mm連装機銃","type":[4,6,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":0,"dismantle":"[0,2,1,0]"}
,{"id":93,"name":"九七式艦攻(友永隊)","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":11,"bomb":0,"aac":1,"ass":5,"hit":3,"evasion":0,"seek":4,"range":0,"rarity":4,"dismantle":"[1,1,0,2]"}
,{"id":94,"name":"天山一二型(友永隊)","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":14,"bomb":0,"aac":1,"ass":6,"hit":3,"evasion":0,"seek":5,"range":0,"rarity":5,"dismantle":"[2,4,0,4]"}
,{"id":95,"name":"潜水艦53cm艦首魚雷(8門)","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":16,"bomb":0,"aac":0,"ass":0,"hit":3,"evasion":0,"seek":0,"range":1,"rarity":2,"dismantle":"[2,4,2,0]"}
,{"id":96,"name":"零式艦戦21型(熟練)","type":[3,5,6,6,11],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":2,"evasion":2,"seek":1,"range":0,"rarity":3,"dismantle":"[1,1,0,2]"}
,{"id":97,"name":"九九式艦爆(熟練)","type":[3,5,7,7,15],"armor":0,"fire":0,"torpedo":0,"bomb":7,"aac":1,"ass":4,"hit":2,"evasion":0,"seek":2,"range":0,"rarity":3,"dismantle":"[1,1,0,2]"}
,{"id":98,"name":"九七式艦攻(熟練)","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":8,"bomb":0,"aac":0,"ass":5,"hit":2,"evasion":0,"seek":2,"range":0,"rarity":3,"dismantle":"[1,1,0,2]"}
,{"id":99,"name":"九九式艦爆(江草隊)","type":[3,5,7,7,40],"armor":0,"fire":0,"torpedo":0,"bomb":10,"aac":0,"ass":5,"hit":4,"evasion":0,"seek":3,"range":0,"rarity":4,"dismantle":"[1,1,0,2]"}
,{"id":100,"name":"彗星(江草隊)","type":[3,5,7,7,16],"armor":0,"fire":0,"torpedo":0,"bomb":13,"aac":1,"ass":5,"hit":4,"evasion":0,"seek":4,"range":0,"rarity":5,"dismantle":"[2,3,0,3]"}
,{"id":101,"name":"照明弾","type":[11,21,33,27,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":1,"dismantle":"[0,2,1,1]"}
,{"id":102,"name":"九八式水上偵察機(夜偵)","type":[5,7,10,50,2],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":1,"hit":1,"evasion":0,"seek":3,"range":0,"rarity":3,"dismantle":"[2,1,0,4]"}
,{"id":103,"name":"試製35.6cm三連装砲","type":[1,1,3,3,0],"armor":0,"fire":18,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":2,"evasion":0,"seek":0,"range":3,"rarity":4,"dismantle":"[0,11,18,0]"}
,{"id":104,"name":"35.6cm連装砲(ダズル迷彩)","type":[1,1,3,3,0],"armor":0,"fire":15,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":1,"evasion":1,"seek":0,"range":3,"rarity":3,"dismantle":"[0,10,15,0]"}
,{"id":105,"name":"試製41cm三連装砲","type":[1,1,3,3,0],"armor":0,"fire":22,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":2,"evasion":0,"seek":0,"range":3,"rarity":4,"dismantle":"[0,14,22,0]"}
,{"id":106,"name":"13号対空電探改","type":[5,8,12,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":2,"evasion":1,"seek":4,"range":0,"rarity":3,"dismantle":"[0,0,10,11]"}
,{"id":107,"name":"艦隊司令部施設","type":[12,22,34,28,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":1,"evasion":1,"seek":1,"range":0,"rarity":5,"dismantle":"[1,1,1,1]"}
,{"id":108,"name":"熟練艦載機整備員","type":[13,23,35,29,0],"armor":0,"fire":10,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":1,"evasion":0,"seek":1,"range":3,"rarity":3,"dismantle":"[1,10,1,10]"}
,{"id":109,"name":"零戦52型丙(六〇一空)","type":[3,5,6,6,13],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":1,"evasion":1,"seek":0,"range":0,"rarity":3,"dismantle":"[1,2,0,3]"}
,{"id":110,"name":"烈風(六〇一空)","type":[3,5,6,6,13],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":1,"evasion":2,"seek":0,"range":0,"rarity":4,"dismantle":"[2,2,0,9]"}
,{"id":111,"name":"彗星(六〇一空)","type":[3,5,7,7,16],"armor":0,"fire":0,"torpedo":0,"bomb":11,"aac":0,"ass":4,"hit":1,"evasion":0,"seek":1,"range":0,"rarity":3,"dismantle":"[2,3,0,3]"}
,{"id":112,"name":"天山(六〇一空)","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":10,"bomb":0,"aac":0,"ass":4,"hit":1,"evasion":0,"seek":2,"range":0,"rarity":3,"dismantle":"[2,4,0,4]"}
,{"id":113,"name":"流星(六〇一空)","type":[3,5,8,8,17],"armor":0,"fire":0,"torpedo":13,"bomb":0,"aac":0,"ass":5,"hit":1,"evasion":0,"seek":3,"range":0,"rarity":4,"dismantle":"[2,5,0,10]"}
,{"id":114,"name":"38cm連装砲改","type":[1,1,3,3,0],"armor":0,"fire":17,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":3,"evasion":0,"seek":0,"range":3,"rarity":2,"dismantle":"[0,12,18,0]"}
,{"id":115,"name":"Ar196改","type":[5,7,10,10,2],"armor":0,"fire":0,"torpedo":0,"bomb":1,"aac":1,"ass":5,"hit":2,"evasion":0,"seek":5,"range":0,"rarity":2,"dismantle":"[1,2,0,2]"}
,{"id":116,"name":"一式徹甲弾","type":[4,25,19,13,0],"armor":0,"fire":9,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[0,4,9,0]"}
,{"id":117,"name":"試製46cm連装砲","type":[1,1,3,3,0],"armor":0,"fire":23,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":1,"evasion":0,"seek":0,"range":4,"rarity":4,"dismantle":"[1,18,23,0]"}
,{"id":118,"name":"紫雲","type":[5,7,10,10,2],"armor":0,"fire":0,"torpedo":0,"bomb":1,"aac":0,"ass":2,"hit":1,"evasion":0,"seek":8,"range":0,"rarity":4,"dismantle":"[1,1,0,15]"}
,{"id":119,"name":"14cm連装砲","type":[1,1,2,2,0],"armor":0,"fire":4,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":0,"range":2,"rarity":1,"dismantle":"[0,2,2,0]"}
,{"id":120,"name":"91式高射装置","type":[14,24,36,30,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":1,"dismantle":"[0,1,0,1]"}
,{"id":121,"name":"94式高射装置","type":[14,24,36,30,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":2,"dismantle":"[0,1,0,2]"}
,{"id":122,"name":"10cm連装高角砲+高射装置","type":[1,1,1,16,0],"armor":0,"fire":3,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":1,"evasion":1,"seek":0,"range":1,"rarity":3,"dismantle":"[0,2,3,2]"}
,{"id":123,"name":"SKC34 20.3cm連装砲","type":[1,1,2,2,0],"armor":0,"fire":10,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":3,"evasion":0,"seek":0,"range":2,"rarity":3,"dismantle":"[0,4,5,0]"}
,{"id":124,"name":"FuMO25 レーダー","type":[5,8,13,11,0],"armor":0,"fire":3,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":10,"evasion":0,"seek":9,"range":0,"rarity":4,"dismantle":"[0,0,27,29]"}
,{"id":125,"name":"61cm三連装(酸素)魚雷","type":[2,3,5,5,0],"armor":1,"fire":0,"torpedo":8,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":1,"seek":0,"range":1,"rarity":2,"dismantle":"[2,2,1,0]"}
,{"id":126,"name":"WG42 (Wurfgerät 42)","type":[15,26,37,31,0],"armor":-1,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":4,"dismantle":"[1,4,2,1]"}
,{"id":127,"name":"試製FaT仕様九五式酸素魚雷改","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":14,"bomb":0,"aac":0,"ass":0,"hit":7,"evasion":2,"seek":0,"range":1,"rarity":5,"dismantle":"[2,2,1,1]"}
,{"id":128,"name":"試製51cm連装砲","type":[1,1,3,3,0],"armor":0,"fire":30,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":1,"evasion":-1,"seek":0,"range":4,"rarity":5,"dismantle":"[0,30,28,0]"}
,{"id":129,"name":"熟練見張員","type":[16,27,39,32,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":2,"evasion":3,"seek":2,"range":0,"rarity":3,"dismantle":"[1,0,0,0]"}
,{"id":130,"name":"12.7cm高角砲+高射装置","type":[1,2,4,16,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":1,"seek":0,"range":1,"rarity":3,"dismantle":"[0,2,3,2]"}
,{"id":131,"name":"25mm三連装機銃 集中配備","type":[4,6,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":3,"dismantle":"[0,5,2,1]"}
,{"id":132,"name":"零式水中聴音機","type":[7,10,40,18,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":11,"hit":1,"evasion":1,"seek":1,"range":0,"rarity":3,"dismantle":"[0,0,3,3]"}
,{"id":133,"name":"381mm/50 三連装砲","type":[1,1,3,3,0],"armor":0,"fire":20,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":-3,"evasion":-1,"seek":0,"range":4,"rarity":4,"dismantle":"[0,16,21,0]"}
,{"id":134,"name":"OTO 152mm三連装速射砲","type":[1,2,4,4,0],"armor":1,"fire":8,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":1,"evasion":0,"seek":0,"range":2,"rarity":3,"dismantle":"[0,2,5,0]"}
,{"id":135,"name":"90mm単装高角砲","type":[1,2,4,16,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":0,"seek":0,"range":1,"rarity":3,"dismantle":"[0,1,3,0]"}
,{"id":136,"name":"プリエーゼ式水中防御隔壁","type":[6,17,28,23,0],"armor":7,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":-1,"seek":0,"range":0,"rarity":3,"dismantle":"[0,0,24,4]"}
,{"id":137,"name":"381mm/50 三連装砲改","type":[1,1,3,3,0],"armor":0,"fire":21,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":-1,"evasion":-1,"seek":0,"range":4,"rarity":5,"dismantle":"[0,16,22,1]"}
,{"id":138,"name":"二式大艇","type":[17,33,41,33,19],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":1,"hit":1,"evasion":0,"seek":12,"range":0,"rarity":4,"dismantle":"[9,2,0,26]"}
,{"id":139,"name":"15.2cm連装砲改","type":[1,1,2,2,0],"armor":0,"fire":6,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":4,"evasion":0,"seek":0,"range":2,"rarity":3,"dismantle":"[0,2,3,1]"}
,{"id":140,"name":"96式150cm探照灯","type":[8,18,42,24,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":0,"evasion":0,"seek":3,"range":0,"rarity":3,"dismantle":"[0,0,1,3]"}
,{"id":141,"name":"32号対水上電探改","type":[5,8,13,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":9,"evasion":0,"seek":11,"range":0,"rarity":4,"dismantle":"[0,0,22,26]"}
,{"id":142,"name":"15m二重測距儀+21号電探改二","type":[5,8,13,11,0],"armor":1,"fire":1,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":9,"evasion":1,"seek":7,"range":0,"rarity":4,"dismantle":"[0,0,26,28]"}
,{"id":143,"name":"九七式艦攻(村田隊)","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":12,"bomb":0,"aac":1,"ass":5,"hit":2,"evasion":0,"seek":4,"range":0,"rarity":4,"dismantle":"[1,1,0,2]"}
,{"id":144,"name":"天山一二型(村田隊)","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":15,"bomb":0,"aac":1,"ass":6,"hit":2,"evasion":0,"seek":4,"range":0,"rarity":5,"dismantle":"[2,4,0,4]"}
,{"id":145,"name":"戦闘糧食","type":[18,34,43,34,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":1,"dismantle":"[1,0,0,0]"}
,{"id":146,"name":"洋上補給","type":[19,35,44,35,0],"armor":-2,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[30,30,0,0]"}
,{"id":147,"name":"120mm/50 連装砲","type":[1,1,1,1,0],"armor":0,"fire":3,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":1,"evasion":0,"seek":0,"range":1,"rarity":2,"dismantle":"[0,1,2,0]"}
,{"id":148,"name":"試製南山","type":[3,5,7,7,24],"armor":0,"fire":0,"torpedo":0,"bomb":11,"aac":1,"ass":4,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":5,"dismantle":"[4,5,0,15]"}
,{"id":149,"name":"四式水中聴音機","type":[7,10,14,18,0],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":12,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[0,0,1,3]"}
,{"id":150,"name":"秋刀魚の缶詰","type":[18,34,43,34,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[1,0,0,1]"}
,{"id":151,"name":"試製景雲(艦偵型)","type":[5,7,9,9,1],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":11,"range":0,"rarity":5,"dismantle":"[4,0,0,14]"}
,{"id":152,"name":"零式艦戦52型(熟練)","type":[3,5,6,6,12],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":1,"evasion":2,"seek":1,"range":0,"rarity":3,"dismantle":"[1,2,0,3]"}
,{"id":153,"name":"零戦52型丙(付岩井小隊)","type":[3,5,6,6,12],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":1,"evasion":2,"seek":1,"range":0,"rarity":4,"dismantle":"[1,2,0,4]"}
,{"id":154,"name":"零戦62型(爆戦/岩井隊)","type":[3,5,7,7,12],"armor":0,"fire":0,"torpedo":0,"bomb":4,"aac":7,"ass":3,"hit":1,"evasion":2,"seek":1,"range":0,"rarity":5,"dismantle":"[1,3,0,4]"}
,{"id":155,"name":"零戦21型(付岩本小隊)","type":[3,5,6,6,11],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":1,"evasion":3,"seek":1,"range":0,"rarity":3,"dismantle":"[1,2,0,2]"}
,{"id":156,"name":"零戦52型甲(付岩本小隊)","type":[3,5,6,6,12],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":1,"evasion":3,"seek":1,"range":0,"rarity":4,"dismantle":"[1,2,0,4]"}
,{"id":157,"name":"零式艦戦53型(岩本隊)","type":[3,5,6,6,12],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":12,"ass":0,"hit":2,"evasion":4,"seek":3,"range":0,"rarity":5,"dismantle":"[1,2,0,5]"}
,{"id":158,"name":"Bf109T改","type":[3,5,6,6,14],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":0,"evasion":4,"seek":0,"range":0,"rarity":3,"dismantle":"[1,2,0,6]"}
,{"id":159,"name":"Fw190T改","type":[3,5,6,6,37],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":4,"dismantle":"[2,3,0,8]"}
,{"id":160,"name":"10.5cm連装砲","type":[1,2,4,16,0],"armor":0,"fire":3,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":2,"evasion":1,"seek":0,"range":1,"rarity":3,"dismantle":"[0,2,4,0]"}
,{"id":161,"name":"16inch三連装砲 Mk.7","type":[1,1,3,3,0],"armor":1,"fire":24,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":4,"evasion":0,"seek":0,"range":3,"rarity":5,"dismantle":"[0,20,22,2]"}
,{"id":162,"name":"203mm/53 連装砲","type":[1,1,2,2,0],"armor":0,"fire":9,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":-2,"evasion":0,"seek":0,"range":3,"rarity":3,"dismantle":"[0,4,4,0]"}
,{"id":163,"name":"Ro.43水偵","type":[5,7,10,10,25],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":1,"ass":2,"hit":2,"evasion":1,"seek":4,"range":0,"rarity":3,"dismantle":"[1,1,0,2]"}
,{"id":164,"name":"Ro.44水上戦闘機","type":[5,36,45,43,25],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":2,"ass":1,"hit":1,"evasion":2,"seek":2,"range":0,"rarity":3,"dismantle":"[1,1,0,2]"}
,{"id":165,"name":"二式水戦改","type":[5,36,45,43,3],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":3,"ass":1,"hit":1,"evasion":2,"seek":1,"range":0,"rarity":2,"dismantle":"[1,1,0,4]"}
,{"id":166,"name":"大発動艇(八九式中戦車&陸戦隊)","type":[8,14,24,20,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[1,2,4,1]"}
,{"id":167,"name":"特二式内火艇","type":[20,37,46,36,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[1,2,3,2]"}
,{"id":168,"name":"九六式陸攻","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":8,"bomb":10,"aac":1,"ass":2,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":1,"dismantle":"[7,4,0,12]"}
,{"id":169,"name":"一式陸攻","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":10,"bomb":12,"aac":2,"ass":2,"hit":0,"evasion":0,"seek":3,"range":0,"rarity":2,"dismantle":"[8,5,0,13]"}
,{"id":170,"name":"一式陸攻(野中隊)","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":12,"bomb":13,"aac":3,"ass":2,"hit":1,"evasion":0,"seek":4,"range":0,"rarity":4,"dismantle":"[8,5,0,14]"}
,{"id":171,"name":"OS2U","type":[5,7,10,10,43],"armor":0,"fire":0,"torpedo":0,"bomb":1,"aac":1,"ass":1,"hit":2,"evasion":1,"seek":6,"range":0,"rarity":3,"dismantle":"[2,1,0,2]"}
,{"id":172,"name":"5inch連装砲 Mk.28 mod.2","type":[1,2,4,16,0],"armor":1,"fire":4,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":2,"evasion":1,"seek":0,"range":1,"rarity":4,"dismantle":"[0,3,4,2]"}
,{"id":173,"name":"Bofors 40mm四連装機関砲","type":[4,6,21,15,0],"armor":1,"fire":1,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":1,"evasion":2,"seek":0,"range":0,"rarity":4,"dismantle":"[0,6,1,3]"}
,{"id":174,"name":"53cm連装魚雷","type":[2,3,5,5,0],"armor":0,"fire":0,"torpedo":3,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":2,"seek":0,"range":1,"rarity":1,"dismantle":"[1,1,1,0]"}
,{"id":175,"name":"雷電","type":[22,39,48,38,18],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":5,"evasion":2,"seek":0,"range":0,"rarity":4,"dismantle":"[3,2,0,7]"}
,{"id":176,"name":"三式戦 飛燕","type":[22,39,48,44,18],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":3,"seek":0,"range":0,"rarity":3,"dismantle":"[1,2,0,6]"}
,{"id":177,"name":"三式戦 飛燕(飛行第244戦隊)","type":[22,39,48,44,18],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":3,"evasion":4,"seek":0,"range":0,"rarity":5,"dismantle":"[1,2,0,6]"}
,{"id":178,"name":"PBY-5A Catalina","type":[17,33,41,33,19],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":2,"hit":2,"evasion":0,"seek":9,"range":0,"rarity":4,"dismantle":"[8,2,0,18]"}
,{"id":179,"name":"試製61cm六連装(酸素)魚雷","type":[2,3,5,5,0],"armor":0,"fire":0,"torpedo":14,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":0,"range":1,"rarity":4,"dismantle":"[2,4,2,0]"}
,{"id":180,"name":"一式陸攻 二二型甲","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":11,"bomb":12,"aac":3,"ass":2,"hit":0,"evasion":0,"seek":4,"range":0,"rarity":3,"dismantle":"[8,5,0,14]"}
,{"id":181,"name":"零式艦戦32型","type":[3,5,6,6,11],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":2,"dismantle":"[1,2,0,2]"}
,{"id":182,"name":"零式艦戦32型(熟練)","type":[3,5,6,6,11],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":4,"seek":0,"range":0,"rarity":3,"dismantle":"[1,2,0,2]"}
,{"id":183,"name":"16inch三連装砲 Mk.7+GFCS","type":[1,1,3,3,0],"armor":1,"fire":24,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":7,"evasion":1,"seek":0,"range":3,"rarity":6,"dismantle":"[0,20,22,18]"}
,{"id":184,"name":"Re.2001 OR改","type":[3,5,6,6,14],"armor":0,"fire":3,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":3,"dismantle":"[1,2,0,6]"}
,{"id":185,"name":"三式戦 飛燕一型丁","type":[22,39,48,44,18],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":2,"evasion":3,"seek":0,"range":0,"rarity":4,"dismantle":"[1,2,0,6]"}
,{"id":186,"name":"一式陸攻 三四型","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":11,"bomb":12,"aac":4,"ass":2,"hit":1,"evasion":0,"seek":4,"range":0,"rarity":4,"dismantle":"[8,6,0,15]"}
,{"id":187,"name":"銀河","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":14,"bomb":14,"aac":3,"ass":3,"hit":1,"evasion":0,"seek":3,"range":0,"rarity":4,"dismantle":"[9,6,0,17]"}
,{"id":188,"name":"Re.2001 G改","type":[3,5,8,8,14],"armor":0,"fire":3,"torpedo":4,"bomb":0,"aac":4,"ass":0,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":4,"dismantle":"[1,3,0,6]"}
,{"id":189,"name":"Re.2005 改","type":[3,5,6,6,14],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":0,"evasion":3,"seek":0,"range":0,"rarity":5,"dismantle":"[2,3,0,10]"}
,{"id":190,"name":"38.1cm Mk.I連装砲","type":[1,1,3,3,0],"armor":0,"fire":18,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":1,"evasion":0,"seek":0,"range":3,"rarity":3,"dismantle":"[0,11,18,0]"}
,{"id":191,"name":"QF 2ポンド8連装ポンポン砲","type":[4,6,21,15,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[0,6,1,2]"}
,{"id":192,"name":"38.1cm Mk.I/N連装砲改","type":[1,1,3,3,0],"armor":0,"fire":19,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":2,"evasion":0,"seek":0,"range":3,"rarity":4,"dismantle":"[0,12,19,2]"}
,{"id":193,"name":"特大発動艇","type":[8,14,24,20,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[2,2,0,1]"}
,{"id":194,"name":"Laté 298B","type":[5,43,11,10,14],"armor":0,"fire":2,"torpedo":4,"bomb":5,"aac":1,"ass":2,"hit":0,"evasion":1,"seek":4,"range":0,"rarity":3,"dismantle":"[2,4,0,5]"}
,{"id":195,"name":"SBD","type":[3,5,7,7,21],"armor":0,"fire":1,"torpedo":0,"bomb":6,"aac":2,"ass":3,"hit":1,"evasion":2,"seek":2,"range":0,"rarity":2,"dismantle":"[1,3,0,2]"}
,{"id":196,"name":"TBD","type":[3,5,8,8,21],"armor":0,"fire":1,"torpedo":5,"bomb":0,"aac":0,"ass":4,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":2,"dismantle":"[1,4,0,3]"}
,{"id":197,"name":"F4F-3","type":[3,5,6,6,21],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":2,"dismantle":"[1,2,0,2]"}
,{"id":198,"name":"F4F-4","type":[3,5,6,6,21],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":1,"evasion":2,"seek":1,"range":0,"rarity":3,"dismantle":"[1,3,0,2]"}
,{"id":199,"name":"噴式景雲改","type":[3,40,57,39,22],"armor":0,"fire":0,"torpedo":0,"bomb":15,"aac":6,"ass":0,"hit":1,"evasion":0,"seek":3,"range":3,"rarity":5,"dismantle":"[7,5,12,16]"}
,{"id":200,"name":"橘花改","type":[3,40,57,40,23],"armor":0,"fire":0,"torpedo":0,"bomb":11,"aac":12,"ass":0,"hit":0,"evasion":1,"seek":0,"range":3,"rarity":5,"dismantle":"[6,4,10,14]"}
,{"id":201,"name":"紫電一一型","type":[22,39,48,38,12],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":1,"seek":0,"range":0,"rarity":3,"dismantle":"[2,2,0,6]"}
,{"id":202,"name":"紫電二一型 紫電改","type":[22,39,48,38,12],"armor":2,"fire":0,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":1,"evasion":3,"seek":0,"range":0,"rarity":3,"dismantle":"[2,2,0,7]"}
,{"id":203,"name":"艦本新設計 増設バルジ(中型艦)","type":[6,17,27,23,0],"armor":8,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":-1,"seek":0,"range":0,"rarity":3,"dismantle":"[0,0,24,2]"}
,{"id":204,"name":"艦本新設計 増設バルジ(大型艦)","type":[6,17,28,23,0],"armor":10,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":-2,"seek":0,"range":0,"rarity":3,"dismantle":"[0,0,30,3]"}
,{"id":205,"name":"F6F-3","type":[3,5,6,6,21],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":2,"seek":1,"range":0,"rarity":4,"dismantle":"[1,2,0,3]"}
,{"id":206,"name":"F6F-5","type":[3,5,6,6,21],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":1,"evasion":3,"seek":1,"range":0,"rarity":5,"dismantle":"[2,4,0,5]"}
,{"id":207,"name":"瑞雲(六三一空)","type":[5,43,11,10,24],"armor":0,"fire":0,"torpedo":0,"bomb":7,"aac":1,"ass":2,"hit":2,"evasion":0,"seek":4,"range":0,"rarity":3,"dismantle":"[2,3,0,5]"}
,{"id":208,"name":"晴嵐(六三一空)","type":[5,43,11,10,2],"armor":0,"fire":0,"torpedo":0,"bomb":12,"aac":0,"ass":3,"hit":2,"evasion":0,"seek":6,"range":0,"rarity":5,"dismantle":"[4,5,0,20]"}
,{"id":209,"name":"彩雲(輸送用分解済)","type":[23,41,50,41,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[2,0,0,11]"}
,{"id":210,"name":"潜水艦搭載電探&水防式望遠鏡","type":[24,42,51,42,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":2,"evasion":8,"seek":4,"range":0,"rarity":2,"dismantle":"[0,0,12,13]"}
,{"id":211,"name":"潜水艦搭載電探&逆探(E27)","type":[24,42,51,42,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":3,"evasion":11,"seek":5,"range":0,"rarity":4,"dismantle":"[0,0,13,15]"}
,{"id":212,"name":"彩雲(東カロリン空)","type":[5,7,9,9,1],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":10,"range":0,"rarity":4,"dismantle":"[2,0,0,11]"}
,{"id":213,"name":"後期型艦首魚雷(6門)","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":15,"bomb":0,"aac":0,"ass":0,"hit":3,"evasion":1,"seek":0,"range":1,"rarity":3,"dismantle":"[2,3,2,1]"}
,{"id":214,"name":"熟練聴音員+後期型艦首魚雷(6門)","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":15,"bomb":0,"aac":0,"ass":0,"hit":5,"evasion":4,"seek":1,"range":1,"rarity":4,"dismantle":"[2,3,2,2]"}
,{"id":215,"name":"Ro.44水上戦闘機bis","type":[5,36,45,43,25],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":3,"ass":1,"hit":2,"evasion":2,"seek":3,"range":0,"rarity":4,"dismantle":"[1,1,0,2]"}
,{"id":216,"name":"二式水戦改(熟練)","type":[5,36,45,43,3],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":5,"ass":1,"hit":1,"evasion":2,"seek":1,"range":0,"rarity":4,"dismantle":"[1,1,0,4]"}
,{"id":217,"name":"強風改","type":[5,36,45,43,26],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":0,"evasion":3,"seek":1,"range":0,"rarity":3,"dismantle":"[1,1,0,6]"}
,{"id":218,"name":"四式戦 疾風","type":[22,39,48,44,27],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":1,"evasion":1,"seek":0,"range":0,"rarity":3,"dismantle":"[3,2,0,9]"}
,{"id":219,"name":"零式艦戦63型(爆戦)","type":[3,5,7,7,12],"armor":0,"fire":0,"torpedo":0,"bomb":5,"aac":5,"ass":2,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[1,4,0,4]"}
,{"id":220,"name":"8cm高角砲改+増設機銃","type":[1,2,4,16,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":2,"evasion":1,"seek":0,"range":1,"rarity":4,"dismantle":"[0,2,3,2]"}
,{"id":221,"name":"一式戦 隼II型","type":[22,39,48,44,18],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":2,"dismantle":"[1,1,0,3]"}
,{"id":222,"name":"一式戦 隼III型甲","type":[22,39,48,44,27],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":1,"evasion":3,"seek":0,"range":0,"rarity":3,"dismantle":"[1,1,0,4]"}
,{"id":223,"name":"一式戦 隼III型甲(54戦隊)","type":[22,39,48,44,27],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":3,"seek":1,"range":0,"rarity":4,"dismantle":"[1,1,0,4]"}
,{"id":224,"name":"爆装一式戦 隼III型改(65戦隊)","type":[22,39,47,44,27],"armor":0,"fire":3,"torpedo":0,"bomb":9,"aac":6,"ass":0,"hit":4,"evasion":2,"seek":1,"range":0,"rarity":4,"dismantle":"[1,3,0,5]"}
,{"id":225,"name":"一式戦 隼II型(64戦隊)","type":[22,39,48,44,27],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":1,"evasion":5,"seek":1,"range":0,"rarity":5,"dismantle":"[1,2,0,3]"}
,{"id":226,"name":"九五式爆雷","type":[7,32,15,17,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":4,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":1,"dismantle":"[1,2,0,1]"}
,{"id":227,"name":"二式爆雷","type":[7,32,15,17,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":7,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[1,3,0,1]"}
,{"id":228,"name":"九六式艦戦改","type":[3,5,6,6,1],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":2,"dismantle":"[1,1,0,2]"}
,{"id":229,"name":"12.7cm単装高角砲(後期型)","type":[1,1,1,16,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":4,"ass":1,"hit":1,"evasion":1,"seek":0,"range":1,"rarity":2,"dismantle":"[0,1,2,0]"}
,{"id":230,"name":"特大発動艇+戦車第11連隊","type":[8,14,24,20,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[2,4,5,1]"}
,{"id":231,"name":"30.5cm三連装砲","type":[1,1,3,3,0],"armor":1,"fire":16,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":0,"seek":0,"range":3,"rarity":2,"dismantle":"[0,8,12,0]"}
,{"id":232,"name":"30.5cm三連装砲改","type":[1,1,3,3,0],"armor":1,"fire":17,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":3,"evasion":1,"seek":0,"range":3,"rarity":3,"dismantle":"[0,9,13,3]"}
,{"id":233,"name":"F4U-1D","type":[3,5,7,7,46],"armor":0,"fire":1,"torpedo":0,"bomb":7,"aac":7,"ass":1,"hit":0,"evasion":1,"seek":1,"range":0,"rarity":5,"dismantle":"[2,6,0,7]"}
,{"id":234,"name":"15.5cm三連装副砲改","type":[1,2,4,4,0],"armor":0,"fire":7,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":4,"evasion":1,"seek":0,"range":2,"rarity":3,"dismantle":"[0,3,6,1]"}
,{"id":235,"name":"15.5cm三連装砲改","type":[1,1,2,2,0],"armor":1,"fire":7,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":3,"evasion":1,"seek":0,"range":2,"rarity":3,"dismantle":"[0,3,6,1]"}
,{"id":236,"name":"41cm三連装砲改","type":[1,1,3,3,0],"armor":1,"fire":22,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":4,"evasion":0,"seek":0,"range":3,"rarity":5,"dismantle":"[0,18,23,4]"}
,{"id":237,"name":"瑞雲(六三四空/熟練)","type":[5,43,11,10,32],"armor":0,"fire":0,"torpedo":0,"bomb":9,"aac":4,"ass":6,"hit":1,"evasion":1,"seek":7,"range":0,"rarity":5,"dismantle":"[2,3,0,5]"}
,{"id":238,"name":"零式水上偵察機11型乙","type":[5,7,10,10,2],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":1,"ass":7,"hit":2,"evasion":0,"seek":6,"range":0,"rarity":3,"dismantle":"[1,2,0,3]"}
,{"id":239,"name":"零式水上偵察機11型乙(熟練)","type":[5,7,10,10,2],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":1,"ass":8,"hit":3,"evasion":0,"seek":8,"range":0,"rarity":4,"dismantle":"[1,2,0,3]"}
,{"id":240,"name":"22号対水上電探改四(後期調整型)","type":[5,8,12,11,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":2,"hit":9,"evasion":0,"seek":7,"range":0,"rarity":4,"dismantle":"[0,0,16,17]"}
,{"id":241,"name":"戦闘糧食(特別なおにぎり)","type":[18,34,43,34,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[1,0,0,1]"}
,{"id":242,"name":"Swordfish","type":[3,5,8,8,28],"armor":0,"fire":2,"torpedo":3,"bomb":0,"aac":0,"ass":4,"hit":1,"evasion":0,"seek":1,"range":0,"rarity":2,"dismantle":"[1,1,0,1]"}
,{"id":243,"name":"Swordfish Mk.II(熟練)","type":[3,5,8,8,28],"armor":0,"fire":3,"torpedo":5,"bomb":0,"aac":0,"ass":6,"hit":3,"evasion":0,"seek":2,"range":0,"rarity":3,"dismantle":"[1,2,0,1]"}
,{"id":244,"name":"Swordfish Mk.III(熟練)","type":[3,5,8,8,28],"armor":0,"fire":4,"torpedo":8,"bomb":0,"aac":0,"ass":10,"hit":4,"evasion":0,"seek":5,"range":0,"rarity":4,"dismantle":"[1,3,0,2]"}
,{"id":245,"name":"38cm四連装砲","type":[1,1,3,3,0],"armor":0,"fire":21,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":1,"evasion":0,"seek":0,"range":3,"rarity":4,"dismantle":"[0,20,24,3]"}
,{"id":246,"name":"38cm四連装砲改","type":[1,1,3,3,0],"armor":1,"fire":22,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":3,"evasion":0,"seek":0,"range":2,"rarity":5,"dismantle":"[0,21,24,4]"}
,{"id":247,"name":"15.2cm三連装砲","type":[1,2,4,4,0],"armor":0,"fire":6,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":3,"evasion":0,"seek":0,"range":2,"rarity":3,"dismantle":"[0,2,5,0]"}
,{"id":248,"name":"Skua","type":[3,5,7,7,14],"armor":0,"fire":0,"torpedo":0,"bomb":4,"aac":2,"ass":2,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":2,"dismantle":"[1,2,0,1]"}
,{"id":249,"name":"Fulmar","type":[3,5,6,6,14],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":3,"ass":2,"hit":2,"evasion":1,"seek":1,"range":0,"rarity":2,"dismantle":"[1,2,0,2]"}
,{"id":250,"name":"Spitfire Mk.I","type":[22,39,48,44,29],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":2,"evasion":1,"seek":0,"range":0,"rarity":3,"dismantle":"[1,2,0,4]"}
,{"id":251,"name":"Spitfire Mk.V","type":[22,39,48,44,29],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":3,"evasion":2,"seek":0,"range":0,"rarity":4,"dismantle":"[1,2,0,6]"}
,{"id":252,"name":"Seafire Mk.III改","type":[3,5,6,6,29],"armor":1,"fire":1,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":1,"evasion":2,"seek":0,"range":0,"rarity":4,"dismantle":"[1,2,0,6]"}
,{"id":253,"name":"Spitfire Mk.IX(熟練)","type":[22,39,48,44,29],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":2,"evasion":4,"seek":0,"range":0,"rarity":5,"dismantle":"[2,2,0,7]"}
,{"id":254,"name":"F6F-3N","type":[3,5,6,45,21],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":8,"ass":4,"hit":2,"evasion":3,"seek":2,"range":0,"rarity":4,"dismantle":"[2,3,0,5]"}
,{"id":255,"name":"F6F-5N","type":[3,5,6,45,21],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":10,"ass":5,"hit":3,"evasion":3,"seek":3,"range":0,"rarity":5,"dismantle":"[2,4,0,6]"}
,{"id":256,"name":"TBF","type":[3,5,8,8,21],"armor":0,"fire":2,"torpedo":9,"bomb":0,"aac":1,"ass":6,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":3,"dismantle":"[3,6,0,11]"}
,{"id":257,"name":"TBM-3D","type":[3,5,8,46,21],"armor":0,"fire":2,"torpedo":9,"bomb":0,"aac":1,"ass":8,"hit":2,"evasion":0,"seek":4,"range":0,"rarity":4,"dismantle":"[3,7,0,12]"}
,{"id":258,"name":"夜間作戦航空要員","type":[13,23,35,29,0],"armor":1,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":2,"rarity":3,"dismantle":"[1,10,1,10]"}
,{"id":259,"name":"夜間作戦航空要員+熟練甲板員","type":[13,23,35,29,0],"armor":1,"fire":3,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":1,"seek":0,"range":3,"rarity":4,"dismantle":"[1,10,1,10]"}
,{"id":260,"name":"Type124 ASDIC","type":[7,10,14,18,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":11,"hit":2,"evasion":1,"seek":0,"range":0,"rarity":3,"dismantle":"[0,0,1,4]"}
,{"id":261,"name":"Type144/147 ASDIC","type":[7,10,14,18,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":13,"hit":3,"evasion":1,"seek":0,"range":0,"rarity":4,"dismantle":"[0,0,1,5]"}
,{"id":262,"name":"HF/DF + Type144/147 ASDIC","type":[7,10,14,18,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":15,"hit":3,"evasion":2,"seek":2,"range":0,"rarity":5,"dismantle":"[0,0,1,6]"}
,{"id":263,"name":"紫電改(三四三空) 戦闘301","type":[22,39,48,38,12],"armor":2,"fire":0,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":2,"evasion":4,"seek":0,"range":0,"rarity":4,"dismantle":"[2,4,0,8]"}
,{"id":264,"name":"紫電改(三四三空) 戦闘701","type":[22,39,48,38,12],"armor":2,"fire":0,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":2,"evasion":4,"seek":0,"range":0,"rarity":4,"dismantle":"[2,4,0,8]"}
,{"id":265,"name":"紫電改(三四三空) 戦闘407","type":[22,39,48,38,12],"armor":2,"fire":0,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":2,"evasion":4,"seek":0,"range":0,"rarity":4,"dismantle":"[2,4,0,8]"}
,{"id":266,"name":"12.7cm連装砲C型改二","type":[1,1,1,1,0],"armor":1,"fire":3,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":1,"evasion":0,"seek":0,"range":1,"rarity":2,"dismantle":"[0,1,2,0]"}
,{"id":267,"name":"12.7cm連装砲D型改二","type":[1,1,1,1,0],"armor":1,"fire":3,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":2,"evasion":1,"seek":0,"range":1,"rarity":3,"dismantle":"[0,2,2,1]"}
,{"id":268,"name":"北方迷彩(+北方装備)","type":[6,17,27,23,0],"armor":2,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":3,"dismantle":"[1,0,3,1]"}
,{"id":269,"name":"試製東海","type":[21,38,47,47,30],"armor":0,"fire":0,"torpedo":0,"bomb":2,"aac":0,"ass":10,"hit":0,"evasion":0,"seek":5,"range":0,"rarity":3,"dismantle":"[3,3,0,12]"}
,{"id":270,"name":"東海(九〇一空)","type":[21,38,47,47,30],"armor":0,"fire":0,"torpedo":0,"bomb":2,"aac":0,"ass":11,"hit":1,"evasion":0,"seek":6,"range":0,"rarity":4,"dismantle":"[4,3,0,13]"}
,{"id":271,"name":"紫電改四","type":[3,5,6,6,12],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":1,"evasion":3,"seek":0,"range":0,"rarity":4,"dismantle":"[2,4,0,8]"}
,{"id":272,"name":"遊撃部隊 艦隊司令部","type":[12,22,34,28,0],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":1,"seek":1,"range":0,"rarity":5,"dismantle":"[2,1,1,1]"}
,{"id":273,"name":"彩雲(偵四)","type":[5,7,9,9,1],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":2,"evasion":0,"seek":10,"range":0,"rarity":4,"dismantle":"[2,0,0,11]"}
,{"id":274,"name":"12cm30連装噴進砲改二","type":[4,29,21,15,0],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":3,"seek":0,"range":0,"rarity":4,"dismantle":"[0,5,2,3]"}
,{"id":275,"name":"10cm連装高角砲改+増設機銃","type":[1,2,4,16,0],"armor":1,"fire":2,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":2,"evasion":1,"seek":0,"range":1,"rarity":4,"dismantle":"[0,3,4,2]"}
,{"id":276,"name":"46cm三連装砲改","type":[1,1,3,3,0],"armor":2,"fire":27,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":2,"evasion":0,"seek":0,"range":4,"rarity":4,"dismantle":"[0,25,26,2]"}
,{"id":277,"name":"FM-2","type":[3,5,7,7,21],"armor":0,"fire":2,"torpedo":0,"bomb":2,"aac":6,"ass":1,"hit":2,"evasion":2,"seek":0,"range":0,"rarity":4,"dismantle":"[1,3,0,3]"}
,{"id":278,"name":"SK レーダー","type":[5,8,13,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":2,"seek":10,"range":0,"rarity":3,"dismantle":"[0,0,21,25]"}
,{"id":279,"name":"SK+SG レーダー","type":[5,8,13,11,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":4,"evasion":4,"seek":12,"range":2,"rarity":4,"dismantle":"[0,0,22,27]"}
,{"id":280,"name":"QF 4.7inch砲 Mk.XII改","type":[1,1,1,1,0],"armor":0,"fire":3,"torpedo":0,"bomb":0,"aac":3,"ass":1,"hit":1,"evasion":1,"seek":0,"range":1,"rarity":3,"dismantle":"[0,2,2,1]"}
,{"id":281,"name":"51cm連装砲","type":[1,1,3,3,0],"armor":2,"fire":32,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":1,"evasion":-1,"seek":0,"range":4,"rarity":5,"dismantle":"[0,30,28,0]"}
,{"id":282,"name":"130mm B-13連装砲","type":[1,1,1,1,0],"armor":1,"fire":4,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":3,"dismantle":"[0,2,3,0]"}
,{"id":283,"name":"533mm 三連装魚雷","type":[2,3,5,5,0],"armor":0,"fire":1,"torpedo":5,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":1,"seek":0,"range":1,"rarity":2,"dismantle":"[1,1,1,0]"}
,{"id":284,"name":"5inch単装砲 Mk.30","type":[1,1,1,16,0],"armor":1,"fire":2,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":1,"evasion":2,"seek":0,"range":1,"rarity":3,"dismantle":"[0,1,2,2]"}
,{"id":285,"name":"61cm三連装(酸素)魚雷後期型","type":[2,3,5,5,0],"armor":1,"fire":0,"torpedo":9,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":2,"seek":0,"range":1,"rarity":3,"dismantle":"[2,2,2,1]"}
,{"id":286,"name":"61cm四連装(酸素)魚雷後期型","type":[2,3,5,5,0],"armor":1,"fire":0,"torpedo":11,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":0,"range":1,"rarity":3,"dismantle":"[2,3,2,1]"}
,{"id":287,"name":"三式爆雷投射機 集中配備","type":[7,32,15,17,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":12,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[0,6,2,2]"}
,{"id":288,"name":"試製15cm9連装対潜噴進砲","type":[7,32,15,17,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":15,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[0,9,3,2]"}
,{"id":289,"name":"35.6cm三連装砲改(ダズル迷彩仕様)","type":[1,1,3,3,0],"armor":0,"fire":19,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":3,"evasion":2,"seek":0,"range":3,"rarity":4,"dismantle":"[0,16,20,2]"}
,{"id":290,"name":"41cm三連装砲改二","type":[1,1,3,3,0],"armor":0,"fire":23,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":5,"evasion":0,"seek":0,"range":3,"rarity":5,"dismantle":"[0,20,22,6]"}
,{"id":291,"name":"彗星二二型(六三四空)","type":[3,5,7,7,16],"armor":0,"fire":0,"torpedo":0,"bomb":11,"aac":1,"ass":4,"hit":2,"evasion":0,"seek":0,"range":3,"rarity":3,"dismantle":"[2,4,0,3]"}
,{"id":292,"name":"彗星二二型(六三四空/熟練)","type":[3,5,7,7,16],"armor":0,"fire":0,"torpedo":0,"bomb":12,"aac":2,"ass":5,"hit":3,"evasion":0,"seek":2,"range":3,"rarity":4,"dismantle":"[2,5,0,3]"}
,{"id":293,"name":"12cm単装砲改二","type":[1,1,1,1,0],"armor":1,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":1,"seek":0,"range":1,"rarity":2,"dismantle":"[0,1,1,0]"}
,{"id":294,"name":"12.7cm連装砲A型改二","type":[1,1,1,1,0],"armor":1,"fire":2,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":1,"evasion":0,"seek":0,"range":1,"rarity":2,"dismantle":"[0,1,2,0]"}
,{"id":295,"name":"12.7cm連装砲A型改三(戦時改修)+高射装置","type":[1,1,1,16,0],"armor":1,"fire":2,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":0,"seek":0,"range":1,"rarity":3,"dismantle":"[0,2,2,2]"}
,{"id":296,"name":"12.7cm連装砲B型改四(戦時改修)+高射装置","type":[1,1,1,16,0],"armor":1,"fire":3,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":1,"evasion":0,"seek":0,"range":1,"rarity":3,"dismantle":"[0,3,2,2]"}
,{"id":297,"name":"12.7cm連装砲A型","type":[1,1,1,1,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":0,"evasion":0,"seek":0,"range":1,"rarity":1,"dismantle":"[0,1,2,0]"}
,{"id":298,"name":"16inch Mk.I三連装砲","type":[1,1,3,3,0],"armor":1,"fire":21,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":0,"range":3,"rarity":3,"dismantle":"[0,15,21,1]"}
,{"id":299,"name":"16inch Mk.I三連装砲+AFCT改","type":[1,1,3,3,0],"armor":1,"fire":22,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":4,"evasion":0,"seek":0,"range":3,"rarity":4,"dismantle":"[0,15,22,2]"}
,{"id":300,"name":"16inch Mk.I三連装砲改+FCR type284","type":[1,1,3,3,0],"armor":1,"fire":23,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":6,"evasion":2,"seek":0,"range":3,"rarity":5,"dismantle":"[0,16,23,4]"}
,{"id":301,"name":"20連装7inch UP Rocket Launchers","type":[4,29,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":3,"dismantle":"[0,4,2,4]"}
,{"id":302,"name":"九七式艦攻(九三一空/熟練)","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":8,"bomb":0,"aac":0,"ass":9,"hit":2,"evasion":1,"seek":3,"range":0,"rarity":3,"dismantle":"[2,3,0,4]"}
,{"id":303,"name":"Bofors 15.2cm連装砲 Model 1930","type":[1,1,2,2,0],"armor":0,"fire":5,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":3,"evasion":1,"seek":0,"range":2,"rarity":3,"dismantle":"[0,2,3,1]"}
,{"id":304,"name":"S9 Osprey","type":[5,7,10,10,28],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":1,"ass":2,"hit":2,"evasion":0,"seek":4,"range":0,"rarity":2,"dismantle":"[1,1,0,2]"}
,{"id":305,"name":"Ju87C改二(KMX搭載機)","type":[3,5,7,7,14],"armor":0,"fire":0,"torpedo":0,"bomb":9,"aac":0,"ass":9,"hit":2,"evasion":1,"seek":2,"range":0,"rarity":4,"dismantle":"[2,5,0,7]"}
,{"id":306,"name":"Ju87C改二(KMX搭載機/熟練)","type":[3,5,7,7,14],"armor":0,"fire":0,"torpedo":0,"bomb":10,"aac":0,"ass":10,"hit":3,"evasion":1,"seek":2,"range":3,"rarity":5,"dismantle":"[2,5,0,7]"}
,{"id":307,"name":"GFCS Mk.37","type":[5,8,12,11,0],"armor":1,"fire":2,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":9,"evasion":2,"seek":6,"range":2,"rarity":4,"dismantle":"[0,0,20,24]"}
,{"id":308,"name":"5inch単装砲 Mk.30改+GFCS Mk.37","type":[1,1,1,16,0],"armor":1,"fire":3,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":6,"evasion":2,"seek":3,"range":2,"rarity":5,"dismantle":"[0,2,22,28]"}
,{"id":309,"name":"甲標的 丙型","type":[2,4,22,5,0],"armor":0,"fire":0,"torpedo":14,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":1,"seek":0,"range":0,"rarity":3,"dismantle":"[2,8,8,3]"}
,{"id":310,"name":"14cm連装砲改","type":[1,1,2,2,0],"armor":1,"fire":5,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":3,"evasion":0,"seek":0,"range":2,"rarity":2,"dismantle":"[0,3,2,1]"}
,{"id":311,"name":"二式陸上偵察機","type":[25,7,49,9,31],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":2,"evasion":0,"seek":8,"range":0,"rarity":2,"dismantle":"[4,2,0,12]"}
,{"id":312,"name":"二式陸上偵察機(熟練)","type":[25,7,49,9,31],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":3,"evasion":0,"seek":9,"range":0,"rarity":3,"dismantle":"[5,2,0,13]"}
,{"id":313,"name":"5inch単装砲 Mk.30改","type":[1,1,1,16,0],"armor":1,"fire":3,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":2,"evasion":2,"seek":0,"range":1,"rarity":4,"dismantle":"[0,2,2,3]"}
,{"id":314,"name":"533mm五連装魚雷(初期型)","type":[2,3,5,5,0],"armor":1,"fire":1,"torpedo":8,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":1,"seek":0,"range":1,"rarity":2,"dismantle":"[1,3,2,2]"}
,{"id":315,"name":"SG レーダー(初期型)","type":[5,8,12,11,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":3,"ass":3,"hit":8,"evasion":6,"seek":8,"range":2,"rarity":3,"dismantle":"[0,0,15,20]"}
,{"id":316,"name":"Re.2001 CB改","type":[3,5,7,7,14],"armor":0,"fire":3,"torpedo":0,"bomb":6,"aac":4,"ass":3,"hit":1,"evasion":2,"seek":0,"range":0,"rarity":4,"dismantle":"[1,4,0,6]"}
,{"id":317,"name":"三式弾改","type":[4,28,18,12,0],"armor":0,"fire":3,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[0,10,6,4]"}
,{"id":318,"name":"41cm連装砲改二","type":[1,1,3,3,0],"armor":2,"fire":21,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":5,"evasion":1,"seek":0,"range":3,"rarity":5,"dismantle":"[0,18,20,6]"}
,{"id":319,"name":"彗星一二型(六三四空/三号爆弾搭載機)","type":[3,5,7,7,16],"armor":0,"fire":0,"torpedo":0,"bomb":12,"aac":3,"ass":2,"hit":1,"evasion":1,"seek":0,"range":0,"rarity":4,"dismantle":"[2,5,0,4]"}
,{"id":320,"name":"彗星一二型(三一号光電管爆弾搭載機)","type":[3,5,7,7,16],"armor":0,"fire":0,"torpedo":0,"bomb":11,"aac":0,"ass":0,"hit":5,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[2,6,0,5]"}
,{"id":322,"name":"瑞雲改二(六三四空)","type":[5,43,11,10,32],"armor":0,"fire":2,"torpedo":0,"bomb":10,"aac":4,"ass":6,"hit":2,"evasion":1,"seek":7,"range":0,"rarity":6,"dismantle":"[2,3,0,5]"}
,{"id":323,"name":"瑞雲改二(六三四空/熟練)","type":[5,43,11,10,32],"armor":0,"fire":2,"torpedo":0,"bomb":11,"aac":5,"ass":7,"hit":3,"evasion":3,"seek":8,"range":0,"rarity":7,"dismantle":"[2,3,0,5]"}
,{"id":324,"name":"オ号観測機改","type":[3,15,25,21,53],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":10,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[1,2,0,4]"}
,{"id":325,"name":"オ号観測機改二","type":[3,15,25,21,53],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":11,"hit":1,"evasion":0,"seek":1,"range":0,"rarity":5,"dismantle":"[1,3,0,4]"}
,{"id":326,"name":"S-51J","type":[3,44,25,21,53],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":0,"ass":12,"hit":2,"evasion":0,"seek":3,"range":0,"rarity":6,"dismantle":"[2,3,0,5]"}
,{"id":327,"name":"S-51J改","type":[3,44,25,21,53],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":0,"ass":13,"hit":3,"evasion":0,"seek":4,"range":0,"rarity":7,"dismantle":"[2,3,0,6]"}
,{"id":328,"name":"35.6cm連装砲改","type":[1,1,3,3,0],"armor":2,"fire":16,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":3,"evasion":2,"seek":0,"range":3,"rarity":3,"dismantle":"[0,11,16,1]"}
,{"id":329,"name":"35.6cm連装砲改二","type":[1,1,3,3,0],"armor":2,"fire":17,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":5,"evasion":2,"seek":0,"range":3,"rarity":4,"dismantle":"[0,11,18,5]"}
,{"id":330,"name":"16inch Mk.I連装砲","type":[1,1,3,3,0],"armor":1,"fire":20,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":1,"seek":0,"range":3,"rarity":2,"dismantle":"[0,12,20,0]"}
,{"id":331,"name":"16inch Mk.V連装砲","type":[1,1,3,3,0],"armor":2,"fire":21,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":2,"evasion":1,"seek":0,"range":3,"rarity":3,"dismantle":"[0,13,21,2]"}
,{"id":332,"name":"16inch Mk.VIII連装砲改","type":[1,1,3,3,0],"armor":2,"fire":21,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":4,"evasion":2,"seek":0,"range":3,"rarity":4,"dismantle":"[0,15,22,6]"}
,{"id":333,"name":"烈風改","type":[22,39,48,38,34],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":6,"evasion":2,"seek":0,"range":0,"rarity":4,"dismantle":"[2,4,0,9]"}
,{"id":334,"name":"烈風改(三五二空/熟練)","type":[22,39,48,38,34],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":7,"evasion":3,"seek":0,"range":0,"rarity":5,"dismantle":"[3,4,0,9]"}
,{"id":335,"name":"烈風改(試製艦載型)","type":[3,5,6,6,34],"armor":1,"fire":1,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":2,"evasion":3,"seek":0,"range":0,"rarity":4,"dismantle":"[3,4,0,9]"}
,{"id":336,"name":"烈風改二","type":[3,5,6,6,34],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":13,"ass":0,"hit":2,"evasion":1,"seek":0,"range":0,"rarity":5,"dismantle":"[3,3,0,10]"}
,{"id":337,"name":"烈風改二(一航戦/熟練)","type":[3,5,6,6,34],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":14,"ass":0,"hit":2,"evasion":1,"seek":0,"range":0,"rarity":6,"dismantle":"[3,3,0,10]"}
,{"id":338,"name":"烈風改二戊型","type":[3,5,6,45,34],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":0,"evasion":2,"seek":1,"range":0,"rarity":6,"dismantle":"[3,3,0,11]"}
,{"id":339,"name":"烈風改二戊型(一航戦/熟練)","type":[3,5,6,45,34],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":12,"ass":0,"hit":0,"evasion":3,"seek":1,"range":0,"rarity":7,"dismantle":"[3,4,0,11]"}
,{"id":340,"name":"152mm/55 三連装速射砲","type":[1,1,2,2,0],"armor":1,"fire":8,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":1,"evasion":0,"seek":0,"range":2,"rarity":3,"dismantle":"[0,3,5,1]"}
,{"id":341,"name":"152mm/55 三連装速射砲改","type":[1,1,2,2,0],"armor":1,"fire":9,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":2,"evasion":1,"seek":0,"range":2,"rarity":4,"dismantle":"[0,4,5,2]"}
,{"id":342,"name":"流星改(一航戦)","type":[3,5,8,8,33],"armor":0,"fire":0,"torpedo":14,"bomb":0,"aac":2,"ass":6,"hit":1,"evasion":0,"seek":4,"range":0,"rarity":5,"dismantle":"[2,6,0,11]"}
,{"id":343,"name":"流星改(一航戦/熟練)","type":[3,5,8,8,33],"armor":0,"fire":0,"torpedo":15,"bomb":0,"aac":3,"ass":7,"hit":2,"evasion":0,"seek":6,"range":0,"rarity":6,"dismantle":"[2,6,0,11]"}
,{"id":344,"name":"九七式艦攻改 試製三号戊型(空六号電探改装備機)","type":[3,5,8,46,11],"armor":0,"fire":0,"torpedo":7,"bomb":0,"aac":0,"ass":6,"hit":1,"evasion":0,"seek":4,"range":0,"rarity":3,"dismantle":"[2,4,0,5]"}
,{"id":345,"name":"九七式艦攻改(熟練) 試製三号戊型(空六号電探改装備機)","type":[3,5,8,46,11],"armor":0,"fire":0,"torpedo":9,"bomb":0,"aac":0,"ass":7,"hit":2,"evasion":0,"seek":5,"range":0,"rarity":4,"dismantle":"[2,4,0,5]"}
,{"id":346,"name":"二式12cm迫撃砲改","type":[7,32,15,17,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":3,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":3,"dismantle":"[1,2,1,1]"}
,{"id":347,"name":"二式12cm迫撃砲改 集中配備","type":[7,32,15,17,0],"armor":-1,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":7,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":4,"dismantle":"[1,4,2,1]"}
,{"id":348,"name":"艦載型 四式20cm対地噴進砲","type":[15,26,37,31,0],"armor":-2,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[1,3,1,1]"}
,{"id":349,"name":"四式20cm対地噴進砲 集中配備","type":[15,26,37,31,0],"armor":-4,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":5,"dismantle":"[1,6,1,2]"}
,{"id":350,"name":"Me163B","type":[22,39,48,38,36],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":9,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[4,3,1,6]"}
,{"id":351,"name":"試製 秋水","type":[22,39,48,38,35],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":8,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[4,3,1,6]"}
,{"id":352,"name":"秋水","type":[22,39,48,38,36],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":9,"evasion":0,"seek":0,"range":0,"rarity":5,"dismantle":"[4,3,1,7]"}
,{"id":353,"name":"Fw190 A-5改(熟練)","type":[3,5,6,6,37],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":1,"evasion":3,"seek":0,"range":0,"rarity":5,"dismantle":"[3,3,0,9]"}
,{"id":354,"name":"Fw190 D-9","type":[22,39,48,38,37],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":12,"ass":0,"hit":3,"evasion":3,"seek":0,"range":0,"rarity":5,"dismantle":"[3,4,0,9]"}
,{"id":355,"name":"M4A1 DD","type":[8,45,24,20,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":-1,"seek":0,"range":0,"rarity":4,"dismantle":"[2,6,8,2]"}
,{"id":356,"name":"8inch三連装砲 Mk.9","type":[1,1,2,2,0],"armor":0,"fire":11,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":0,"evasion":-1,"seek":0,"range":2,"rarity":2,"dismantle":"[0,6,9,0]"}
,{"id":357,"name":"8inch三連装砲 Mk.9 mod.2","type":[1,1,2,2,0],"armor":0,"fire":12,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":1,"evasion":-1,"seek":0,"range":2,"rarity":3,"dismantle":"[1,6,1,2]"}
,{"id":358,"name":"5inch 単装高角砲群","type":[1,2,4,16,0],"armor":1,"fire":2,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":1,"evasion":1,"seek":0,"range":1,"rarity":2,"dismantle":"[0,2,3,1]"}
,{"id":359,"name":"6inch 連装速射砲 Mk.XXI","type":[1,1,2,2,0],"armor":1,"fire":5,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":2,"evasion":1,"seek":0,"range":2,"rarity":2,"dismantle":"[0,2,3,1]"}
,{"id":360,"name":"Bofors 15cm連装速射砲 Mk.9 Model 1938","type":[1,1,2,2,0],"armor":0,"fire":6,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":3,"evasion":2,"seek":0,"range":2,"rarity":3,"dismantle":"[0,2,3,1]"}
,{"id":361,"name":"Bofors 15cm連装速射砲 Mk.9改+単装速射砲 Mk.10改 Model 1938","type":[1,1,2,2,0],"armor":-1,"fire":7,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":3,"evasion":3,"seek":0,"range":2,"rarity":4,"dismantle":"[0,3,4,2]"}
,{"id":362,"name":"5inch連装両用砲(集中配備)","type":[1,1,2,16,0],"armor":0,"fire":5,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":2,"evasion":2,"seek":0,"range":2,"rarity":4,"dismantle":"[0,4,6,4]"}
,{"id":363,"name":"GFCS Mk.37+5inch連装両用砲(集中配備)","type":[1,1,2,16,0],"armor":0,"fire":6,"torpedo":0,"bomb":0,"aac":14,"ass":0,"hit":6,"evasion":3,"seek":3,"range":2,"rarity":5,"dismantle":"[0,4,26,28]"}
,{"id":364,"name":"甲標的 丁型改(蛟龍改)","type":[2,4,22,5,0],"armor":0,"fire":0,"torpedo":17,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":2,"range":0,"rarity":4,"dismantle":"[4,9,12,4]"}
,{"id":365,"name":"一式徹甲弾改","type":[4,25,19,13,0],"armor":0,"fire":11,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[0,6,10,1]"}
,{"id":366,"name":"12.7cm連装砲D型改三","type":[1,1,1,1,0],"armor":1,"fire":3,"torpedo":0,"bomb":0,"aac":4,"ass":2,"hit":2,"evasion":2,"seek":0,"range":1,"rarity":4,"dismantle":"[0,2,3,1]"}
,{"id":367,"name":"Swordfish(水上機型)","type":[5,43,11,10,28],"armor":0,"fire":2,"torpedo":5,"bomb":5,"aac":0,"ass":4,"hit":1,"evasion":0,"seek":2,"range":0,"rarity":3,"dismantle":"[1,2,0,3]"}
,{"id":368,"name":"Swordfish Mk.III改(水上機型)","type":[5,43,11,10,28],"armor":0,"fire":4,"torpedo":6,"bomb":7,"aac":0,"ass":7,"hit":2,"evasion":0,"seek":3,"range":0,"rarity":4,"dismantle":"[1,3,0,3]"}
,{"id":369,"name":"Swordfish Mk.III改(水上機型/熟練)","type":[5,43,11,10,28],"armor":0,"fire":4,"torpedo":7,"bomb":8,"aac":0,"ass":8,"hit":3,"evasion":0,"seek":4,"range":0,"rarity":5,"dismantle":"[1,3,0,3]"}
,{"id":370,"name":"Swordfish Mk.II改(水偵型)","type":[5,7,10,10,28],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":6,"hit":2,"evasion":0,"seek":5,"range":0,"rarity":4,"dismantle":"[1,2,0,4]"}
,{"id":371,"name":"Fairey Seafox改","type":[5,7,10,10,28],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":1,"ass":3,"hit":2,"evasion":1,"seek":6,"range":0,"rarity":4,"dismantle":"[1,2,0,4]"}
,{"id":372,"name":"天山一二型甲","type":[3,5,8,8,1],"armor":0,"fire":0,"torpedo":9,"bomb":0,"aac":1,"ass":4,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":3,"dismantle":"[2,5,0,5]"}
,{"id":373,"name":"天山一二型甲改(空六号電探改装備機)","type":[3,5,8,46,1],"armor":0,"fire":0,"torpedo":11,"bomb":0,"aac":1,"ass":6,"hit":1,"evasion":0,"seek":5,"range":0,"rarity":4,"dismantle":"[2,5,0,6]"}
,{"id":374,"name":"天山一二型甲改(熟練/空六号電探改装備機)","type":[3,5,8,46,1],"armor":0,"fire":0,"torpedo":13,"bomb":0,"aac":1,"ass":7,"hit":2,"evasion":0,"seek":6,"range":0,"rarity":5,"dismantle":"[3,6,0,6]"}
,{"id":375,"name":"XF5U","type":[3,5,6,6,38],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":12,"ass":0,"hit":0,"evasion":2,"seek":1,"range":0,"rarity":6,"dismantle":"[3,4,1,14]"}
,{"id":376,"name":"533mm五連装魚雷(後期型)","type":[2,3,5,5,0],"armor":1,"fire":1,"torpedo":11,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":1,"seek":0,"range":1,"rarity":3,"dismantle":"[2,4,2,3]"}
,{"id":377,"name":"RUR-4A Weapon Alpha改","type":[7,32,15,17,0],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":17,"hit":1,"evasion":1,"seek":0,"range":0,"rarity":5,"dismantle":"[1,10,4,4]"}
,{"id":378,"name":"対潜短魚雷(試作初期型)","type":[7,32,15,17,0],"armor":0,"fire":0,"torpedo":2,"bomb":0,"aac":0,"ass":20,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":6,"dismantle":"[2,11,2,5]"}
,{"id":379,"name":"12.7cm単装高角砲改二","type":[1,1,1,16,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":5,"ass":2,"hit":1,"evasion":3,"seek":0,"range":1,"rarity":3,"dismantle":"[0,1,2,1]"}
,{"id":380,"name":"12.7cm連装高角砲改二","type":[1,1,1,16,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":6,"ass":2,"hit":1,"evasion":2,"seek":0,"range":1,"rarity":3,"dismantle":"[0,2,2,1]"}
,{"id":381,"name":"16inch三連装砲 Mk.6","type":[1,1,3,3,0],"armor":1,"fire":22,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":2,"evasion":0,"seek":0,"range":3,"rarity":3,"dismantle":"[0,13,22,2]"}
,{"id":382,"name":"12cm単装高角砲E型","type":[1,1,1,16,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":3,"ass":1,"hit":0,"evasion":2,"seek":0,"range":1,"rarity":2,"dismantle":"[0,1,1,1]"}
,{"id":383,"name":"後期型53cm艦首魚雷(8門)","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":19,"bomb":0,"aac":0,"ass":0,"hit":3,"evasion":1,"seek":0,"range":1,"rarity":4,"dismantle":"[3,4,3,1]"}
,{"id":384,"name":"後期型潜水艦搭載電探&逆探","type":[24,42,51,42,0],"armor":1,"fire":2,"torpedo":4,"bomb":0,"aac":0,"ass":0,"hit":4,"evasion":13,"seek":7,"range":0,"rarity":5,"dismantle":"[0,0,14,19]"}
,{"id":385,"name":"16inch三連装砲 Mk.6 mod.2","type":[1,1,3,3,0],"armor":2,"fire":23,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":3,"evasion":0,"seek":0,"range":3,"rarity":4,"dismantle":"[0,14,22,3]"}
,{"id":386,"name":"6inch三連装速射砲 Mk.16","type":[1,1,2,2,0],"armor":1,"fire":7,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":2,"evasion":0,"seek":0,"range":2,"rarity":3,"dismantle":"[0,2,5,1]"}
,{"id":387,"name":"6inch三連装速射砲 Mk.16 mod.2","type":[1,1,2,2,0],"armor":1,"fire":8,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":4,"evasion":1,"seek":0,"range":2,"rarity":4,"dismantle":"[0,3,6,2]"}
,{"id":388,"name":"銀河(江草隊)","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":15,"bomb":15,"aac":3,"ass":4,"hit":3,"evasion":0,"seek":4,"range":0,"rarity":5,"dismantle":"[9,7,0,17]"}
,{"id":389,"name":"TBM-3W+3S","type":[3,5,8,46,39],"armor":0,"fire":3,"torpedo":10,"bomb":7,"aac":0,"ass":13,"hit":3,"evasion":0,"seek":10,"range":0,"rarity":6,"dismantle":"[4,6,0,16]"}
,{"id":390,"name":"16inch三連装砲 Mk.6+GFCS","type":[1,1,3,3,0],"armor":2,"fire":23,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":6,"evasion":1,"seek":0,"range":3,"rarity":5,"dismantle":"[0,16,22,16]"}
,{"id":391,"name":"九九式艦爆二二型","type":[3,5,7,7,40],"armor":0,"fire":0,"torpedo":0,"bomb":6,"aac":0,"ass":3,"hit":1,"evasion":0,"seek":2,"range":0,"rarity":2,"dismantle":"[1,1,0,2]"}
,{"id":392,"name":"九九式艦爆二二型(熟練)","type":[3,5,7,7,40],"armor":0,"fire":0,"torpedo":0,"bomb":8,"aac":1,"ass":4,"hit":3,"evasion":0,"seek":3,"range":0,"rarity":3,"dismantle":"[1,1,0,2]"}
,{"id":393,"name":"120mm/50 連装砲 mod.1936","type":[1,1,1,1,0],"armor":0,"fire":3,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":2,"evasion":0,"seek":0,"range":1,"rarity":3,"dismantle":"[0,1,2,0]"}
,{"id":394,"name":"120mm/50 連装砲改 A.mod.1937","type":[1,1,1,1,0],"armor":0,"fire":3,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":3,"evasion":0,"seek":0,"range":1,"rarity":4,"dismantle":"[0,1,2,0]"}
,{"id":395,"name":"深山","type":[26,46,53,49,41],"armor":0,"fire":0,"torpedo":16,"bomb":17,"aac":1,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[12,18,0,23]"}
,{"id":396,"name":"深山改","type":[26,46,53,49,41],"armor":0,"fire":0,"torpedo":17,"bomb":19,"aac":2,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[13,18,0,24]"}
,{"id":397,"name":"現地改装12.7cm連装高角砲","type":[1,1,1,16,0],"armor":1,"fire":3,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":2,"evasion":0,"seek":0,"range":1,"rarity":4,"dismantle":"[0,2,3,0]"}
,{"id":398,"name":"現地改装10cm連装高角砲","type":[1,1,1,16,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":1,"evasion":2,"seek":0,"range":1,"rarity":4,"dismantle":"[0,2,3,0]"}
,{"id":399,"name":"6inch Mk.XXIII三連装砲","type":[1,1,2,2,0],"armor":1,"fire":7,"torpedo":0,"bomb":0,"aac":2,"ass":0,"hit":1,"evasion":1,"seek":0,"range":2,"rarity":2,"dismantle":"[0,2,4,1]"}
,{"id":400,"name":"533mm 三連装魚雷(53-39型)","type":[2,3,5,5,0],"armor":0,"fire":1,"torpedo":6,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":2,"seek":0,"range":1,"rarity":3,"dismantle":"[2,1,1,1]"}
,{"id":401,"name":"Do 17 Z-2","type":[21,38,47,37,42],"armor":0,"fire":0,"torpedo":0,"bomb":11,"aac":2,"ass":5,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":2,"dismantle":"[6,5,0,13]"}
,{"id":402,"name":"寒冷地装備&甲板要員","type":[13,23,35,29,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[1,0,1,1]"}
,{"id":403,"name":"四式重爆 飛龍","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":14,"bomb":15,"aac":5,"ass":4,"hit":1,"evasion":0,"seek":4,"range":0,"rarity":4,"dismantle":"[8,8,0,18]"}
,{"id":404,"name":"四式重爆 飛龍(熟練)","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":14,"bomb":16,"aac":5,"ass":5,"hit":2,"evasion":0,"seek":5,"range":0,"rarity":5,"dismantle":"[9,9,0,18]"}
,{"id":405,"name":"Do 217 E-5+Hs293初期型","type":[21,38,47,37,42],"armor":0,"fire":0,"torpedo":13,"bomb":22,"aac":4,"ass":0,"hit":2,"evasion":0,"seek":3,"range":0,"rarity":4,"dismantle":"[6,24,0,19]"}
,{"id":406,"name":"Do 217 K-2+Fritz-X","type":[21,38,47,37,42],"armor":0,"fire":0,"torpedo":16,"bomb":24,"aac":4,"ass":0,"hit":2,"evasion":0,"seek":3,"range":0,"rarity":5,"dismantle":"[6,28,7,20]"}
,{"id":407,"name":"15.2cm連装砲改二","type":[1,1,2,2,0],"armor":1,"fire":6,"torpedo":0,"bomb":0,"aac":4,"ass":0,"hit":4,"evasion":0,"seek":0,"range":2,"rarity":4,"dismantle":"[0,3,4,2]"}
,{"id":408,"name":"装甲艇(AB艇)","type":[8,47,24,20,0],"armor":1,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":1,"range":0,"rarity":2,"dismantle":"[2,3,3,1]"}
,{"id":409,"name":"武装大発","type":[8,47,24,20,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[1,2,2,2]"}
,{"id":410,"name":"21号対空電探改二","type":[5,8,13,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":4,"evasion":4,"seek":7,"range":0,"rarity":4,"dismantle":"[0,0,21,22]"}
,{"id":411,"name":"42号対空電探改二","type":[5,8,13,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":8,"evasion":-1,"seek":6,"range":0,"rarity":4,"dismantle":"[0,0,25,26]"}
,{"id":412,"name":"水雷戦隊 熟練見張員","type":[16,27,39,32,0],"armor":0,"fire":0,"torpedo":3,"bomb":0,"aac":1,"ass":0,"hit":2,"evasion":3,"seek":2,"range":2,"rarity":4,"dismantle":"[1,0,0,0]"}
,{"id":413,"name":"精鋭水雷戦隊 司令部","type":[12,22,34,28,0],"armor":0,"fire":0,"torpedo":3,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":1,"range":0,"rarity":5,"dismantle":"[2,1,1,1]"}
,{"id":414,"name":"SOC Seagull","type":[5,7,10,10,43],"armor":0,"fire":0,"torpedo":0,"bomb":1,"aac":0,"ass":1,"hit":2,"evasion":1,"seek":4,"range":0,"rarity":3,"dismantle":"[1,1,0,2]"}
,{"id":415,"name":"SO3C Seamew改","type":[5,7,10,10,43],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":1,"ass":2,"hit":3,"evasion":0,"seek":7,"range":0,"rarity":4,"dismantle":"[2,1,0,3]"}
,{"id":416,"name":"零式艦戦21型(台南空)","type":[22,39,48,38,11],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":1,"evasion":3,"seek":1,"range":0,"rarity":5,"dismantle":"[1,2,0,2]"}
,{"id":417,"name":"零式艦戦32型(台南空)","type":[22,39,48,38,12],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":12,"ass":0,"hit":1,"evasion":4,"seek":1,"range":0,"rarity":5,"dismantle":"[1,2,0,2]"}
,{"id":418,"name":"零式艦戦22型(251空)","type":[22,39,48,38,12],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":12,"ass":0,"hit":1,"evasion":3,"seek":1,"range":0,"rarity":5,"dismantle":"[1,2,0,3]"}
,{"id":419,"name":"SBD-5","type":[3,5,7,7,21],"armor":0,"fire":1,"torpedo":0,"bomb":7,"aac":2,"ass":4,"hit":2,"evasion":3,"seek":3,"range":0,"rarity":3,"dismantle":"[1,3,0,3]"}
,{"id":420,"name":"SB2C-3","type":[3,5,7,7,21],"armor":0,"fire":1,"torpedo":0,"bomb":11,"aac":2,"ass":5,"hit":1,"evasion":1,"seek":3,"range":0,"rarity":4,"dismantle":"[2,5,0,5]"}
,{"id":421,"name":"SB2C-5","type":[3,5,7,7,21],"armor":0,"fire":2,"torpedo":0,"bomb":12,"aac":2,"ass":6,"hit":2,"evasion":2,"seek":4,"range":0,"rarity":5,"dismantle":"[3,5,0,7]"}
,{"id":422,"name":"FR-1 Fireball","type":[3,5,6,6,21],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":1,"evasion":3,"seek":0,"range":0,"rarity":5,"dismantle":"[3,4,2,9]"}
,{"id":423,"name":"Fulmar(戦闘偵察/熟練)","type":[5,7,9,9,14],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":4,"ass":3,"hit":3,"evasion":3,"seek":4,"range":0,"rarity":3,"dismantle":"[2,2,0,2]"}
,{"id":424,"name":"Barracuda Mk.II","type":[3,5,8,8,44],"armor":0,"fire":0,"torpedo":7,"bomb":0,"aac":0,"ass":5,"hit":1,"evasion":0,"seek":2,"range":0,"rarity":2,"dismantle":"[3,5,0,9]"}
,{"id":425,"name":"Barracuda Mk.III","type":[3,5,8,8,44],"armor":0,"fire":0,"torpedo":6,"bomb":0,"aac":0,"ass":9,"hit":1,"evasion":0,"seek":3,"range":0,"rarity":3,"dismantle":"[3,5,0,10]"}
,{"id":426,"name":"305mm/46 連装砲","type":[1,1,3,3,0],"armor":1,"fire":13,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":2,"seek":0,"range":3,"rarity":2,"dismantle":"[0,6,10,0]"}
,{"id":427,"name":"305mm/46 三連装砲","type":[1,1,3,3,0],"armor":1,"fire":14,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":1,"seek":0,"range":3,"rarity":3,"dismantle":"[0,9,11,0]"}
,{"id":428,"name":"320mm/44 連装砲","type":[1,1,3,3,0],"armor":1,"fire":15,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":2,"seek":0,"range":3,"rarity":3,"dismantle":"[0,10,10,1]"}
,{"id":429,"name":"320mm/44 三連装砲","type":[1,1,3,3,0],"armor":1,"fire":16,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":1,"seek":0,"range":3,"rarity":4,"dismantle":"[0,12,11,1]"}
,{"id":430,"name":"65mm/64 単装速射砲改","type":[1,2,4,16,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":0,"evasion":1,"seek":0,"range":1,"rarity":4,"dismantle":"[0,2,2,2]"}
,{"id":431,"name":"SM.79","type":[21,38,47,37,45],"armor":0,"fire":0,"torpedo":9,"bomb":13,"aac":2,"ass":3,"hit":0,"evasion":0,"seek":2,"range":0,"rarity":2,"dismantle":"[6,6,1,14]"}
,{"id":432,"name":"SM.79 bis","type":[21,38,47,37,45],"armor":0,"fire":0,"torpedo":12,"bomb":14,"aac":3,"ass":4,"hit":0,"evasion":0,"seek":3,"range":0,"rarity":3,"dismantle":"[7,7,1,15]"}
,{"id":433,"name":"SM.79 bis(熟練)","type":[21,38,47,37,45],"armor":0,"fire":0,"torpedo":13,"bomb":14,"aac":3,"ass":4,"hit":2,"evasion":0,"seek":3,"range":0,"rarity":4,"dismantle":"[7,8,1,15]"}
,{"id":434,"name":"Corsair Mk.II","type":[3,5,6,6,46],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":0,"evasion":1,"seek":1,"range":0,"rarity":4,"dismantle":"[2,5,0,7]"}
,{"id":435,"name":"Corsair Mk.II(Ace)","type":[3,5,6,6,46],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":2,"evasion":2,"seek":2,"range":0,"rarity":5,"dismantle":"[3,5,0,7]"}
,{"id":436,"name":"大発動艇(II号戦車/北アフリカ仕様)","type":[8,14,24,20,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[2,3,4,2]"}
,{"id":437,"name":"試製 陣風","type":[3,5,6,6,34],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":13,"ass":0,"hit":1,"evasion":1,"seek":0,"range":0,"rarity":5,"dismantle":"[2,4,0,11]"}
,{"id":438,"name":"三式水中探信儀改","type":[7,10,14,18,0],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":11,"hit":2,"evasion":1,"seek":0,"range":0,"rarity":4,"dismantle":"[0,0,2,4]"}
,{"id":439,"name":"Hedgehog(初期型)","type":[7,32,15,17,0],"armor":-1,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":18,"hit":3,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[1,13,1,2]"}
,{"id":440,"name":"21inch艦首魚雷発射管6門(初期型)","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":10,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":2,"seek":0,"range":1,"rarity":2,"dismantle":"[3,3,2,2]"}
,{"id":441,"name":"21inch艦首魚雷発射管6門(後期型)","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":14,"bomb":0,"aac":0,"ass":0,"hit":3,"evasion":3,"seek":0,"range":1,"rarity":4,"dismantle":"[3,4,2,2]"}
,{"id":442,"name":"潜水艦後部魚雷発射管4門(初期型)","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":6,"bomb":0,"aac":0,"ass":0,"hit":1,"evasion":1,"seek":0,"range":1,"rarity":2,"dismantle":"[2,2,3,2]"}
,{"id":443,"name":"潜水艦後部魚雷発射管4門(後期型)","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":9,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":2,"seek":0,"range":1,"rarity":4,"dismantle":"[2,3,3,2]"}
,{"id":444,"name":"四式重爆 飛龍+イ号一型甲 誘導弾","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":15,"bomb":20,"aac":5,"ass":3,"hit":1,"evasion":0,"seek":4,"range":0,"rarity":5,"dismantle":"[10,20,0,19]"}
,{"id":445,"name":"二式複戦 屠龍","type":[22,39,48,44,47],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":4,"evasion":1,"seek":0,"range":0,"rarity":2,"dismantle":"[2,4,0,12]"}
,{"id":446,"name":"二式複戦 屠龍 丙型","type":[22,39,48,44,47],"armor":2,"fire":0,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":6,"evasion":2,"seek":0,"range":0,"rarity":3,"dismantle":"[2,5,0,12]"}
,{"id":447,"name":"零式艦戦64型(複座KMX搭載機)","type":[3,5,7,7,12],"armor":0,"fire":0,"torpedo":0,"bomb":3,"aac":4,"ass":8,"hit":0,"evasion":0,"seek":3,"range":0,"rarity":4,"dismantle":"[2,3,0,4]"}
,{"id":449,"name":"特大発動艇+一式砲戦車","type":[8,14,24,20,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":5,"dismantle":"[2,4,2,2]"}
,{"id":450,"name":"13号対空電探改(後期型)","type":[5,8,12,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":2,"evasion":3,"seek":5,"range":0,"rarity":4,"dismantle":"[0,0,10,12]"}
,{"id":451,"name":"三式指揮連絡機改","type":[3,16,26,22,54],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":9,"hit":2,"evasion":0,"seek":2,"range":0,"rarity":3,"dismantle":"[2,2,0,3]"}
,{"id":452,"name":"キ96","type":[22,39,48,44,47],"armor":2,"fire":0,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":5,"evasion":4,"seek":0,"range":0,"rarity":4,"dismantle":"[3,5,0,14]"}
,{"id":453,"name":"キ102乙","type":[22,38,47,48,47],"armor":0,"fire":4,"torpedo":11,"bomb":19,"aac":4,"ass":4,"hit":4,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[4,7,0,15]"}
,{"id":454,"name":"キ102乙改+イ号一型乙 誘導弾","type":[22,38,47,48,47],"armor":0,"fire":4,"torpedo":14,"bomb":20,"aac":3,"ass":4,"hit":3,"evasion":0,"seek":0,"range":0,"rarity":5,"dismantle":"[6,12,0,16]"}
,{"id":455,"name":"試製 長12.7cm連装砲A型改四","type":[1,1,1,1,0],"armor":1,"fire":4,"torpedo":0,"bomb":0,"aac":3,"ass":0,"hit":2,"evasion":0,"seek":0,"range":1,"rarity":4,"dismantle":"[0,2,3,2]"}
,{"id":456,"name":"SG レーダー(後期型)","type":[5,8,12,11,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":3,"ass":4,"hit":10,"evasion":6,"seek":9,"range":2,"rarity":5,"dismantle":"[0,0,15,22]"}
,{"id":457,"name":"後期型艦首魚雷(4門)","type":[2,3,32,5,0],"armor":1,"fire":0,"torpedo":12,"bomb":0,"aac":0,"ass":0,"hit":3,"evasion":3,"seek":0,"range":1,"rarity":4,"dismantle":"[2,2,2,2]"}
,{"id":458,"name":"後期型電探&逆探+シュノーケル装備","type":[24,42,51,42,0],"armor":2,"fire":0,"torpedo":4,"bomb":0,"aac":0,"ass":0,"hit":4,"evasion":15,"seek":6,"range":0,"rarity":5,"dismantle":"[1,0,15,20]"}
,{"id":459,"name":"B-25","type":[21,38,47,37,48],"armor":0,"fire":3,"torpedo":8,"bomb":16,"aac":4,"ass":0,"hit":0,"evasion":0,"seek":4,"range":0,"rarity":3,"dismantle":"[9,12,2,17]"}
,{"id":460,"name":"15m二重測距儀改+21号電探改二+熟練射撃指揮所","type":[5,8,13,11,0],"armor":1,"fire":4,"torpedo":0,"bomb":0,"aac":8,"ass":0,"hit":10,"evasion":2,"seek":8,"range":0,"rarity":4,"dismantle":"[0,0,27,29]"}
,{"id":461,"name":"熟練聴音員+後期型艦首魚雷(4門)","type":[2,3,32,5,0],"armor":1,"fire":0,"torpedo":13,"bomb":0,"aac":0,"ass":0,"hit":5,"evasion":5,"seek":0,"range":1,"rarity":5,"dismantle":"[2,2,2,2]"}
,{"id":463,"name":"15.5cm三連装副砲改二","type":[1,2,4,4,0],"armor":1,"fire":9,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":5,"evasion":1,"seek":0,"range":2,"rarity":4,"dismantle":"[0,6,10,2]"}
,{"id":464,"name":"10cm連装高角砲群 集中配備","type":[1,2,4,16,0],"armor":2,"fire":3,"torpedo":0,"bomb":0,"aac":12,"ass":0,"hit":2,"evasion":2,"seek":0,"range":1,"rarity":5,"dismantle":"[0,6,8,3]"}
,{"id":465,"name":"試製51cm三連装砲","type":[1,1,3,3,0],"armor":2,"fire":36,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":-2,"evasion":-10,"seek":0,"range":4,"rarity":6,"dismantle":"[0,30,30,0]"}
,{"id":466,"name":"流星改(熟練)","type":[3,5,8,8,33],"armor":0,"fire":0,"torpedo":13,"bomb":0,"aac":3,"ass":6,"hit":1,"evasion":0,"seek":5,"range":0,"rarity":5,"dismantle":"[2,6,0,11]"}
,{"id":467,"name":"5inch連装砲(副砲配置) 集中配備","type":[1,2,4,16,0],"armor":1,"fire":5,"torpedo":0,"bomb":0,"aac":11,"ass":0,"hit":4,"evasion":3,"seek":0,"range":1,"rarity":4,"dismantle":"[0,5,7,5]"}
,{"id":468,"name":"38cm四連装砲改 deux","type":[1,1,3,3,0],"armor":1,"fire":24,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":4,"evasion":0,"seek":0,"range":2,"rarity":6,"dismantle":"[0,22,25,8]"}
,{"id":469,"name":"零式水上偵察機11型乙改(夜偵)","type":[5,7,10,50,2],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":1,"ass":6,"hit":2,"evasion":0,"seek":5,"range":0,"rarity":4,"dismantle":"[1,2,0,4]"}
,{"id":470,"name":"12.7cm連装砲C型改三","type":[1,1,1,1,0],"armor":1,"fire":3,"torpedo":0,"bomb":0,"aac":2,"ass":3,"hit":1,"evasion":1,"seek":0,"range":1,"rarity":3,"dismantle":"[0,2,2,1]"}
,{"id":471,"name":"Loire 130M","type":[5,7,10,50,49],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":3,"hit":2,"evasion":0,"seek":3,"range":0,"rarity":3,"dismantle":"[2,1,0,5]"}
,{"id":472,"name":"Mk.32 対潜魚雷(Mk.2落射機)","type":[7,32,15,17,0],"armor":0,"fire":0,"torpedo":1,"bomb":0,"aac":0,"ass":19,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":5,"dismantle":"[2,8,2,4]"}
,{"id":473,"name":"F4U-2 Night Corsair","type":[3,5,6,45,50],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":9,"ass":5,"hit":1,"evasion":2,"seek":2,"range":0,"rarity":5,"dismantle":"[2,4,0,7]"}
,{"id":474,"name":"F4U-4","type":[3,5,7,7,50],"armor":0,"fire":2,"torpedo":0,"bomb":6,"aac":10,"ass":3,"hit":0,"evasion":1,"seek":2,"range":0,"rarity":5,"dismantle":"[2,6,0,9]"}
,{"id":475,"name":"AU-1","type":[3,5,7,7,50],"armor":0,"fire":3,"torpedo":6,"bomb":12,"aac":9,"ass":5,"hit":0,"evasion":1,"seek":2,"range":0,"rarity":6,"dismantle":"[3,9,0,10]"}
,{"id":476,"name":"F4U-7","type":[3,5,7,7,50],"armor":0,"fire":3,"torpedo":8,"bomb":11,"aac":10,"ass":4,"hit":0,"evasion":2,"seek":2,"range":0,"rarity":7,"dismantle":"[3,9,0,11]"}
,{"id":477,"name":"熟練甲板要員","type":[13,23,35,29,0],"armor":1,"fire":2,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":1,"evasion":1,"seek":1,"range":0,"rarity":3,"dismantle":"[1,2,0,2]"}
,{"id":478,"name":"熟練甲板要員+航空整備員","type":[13,23,35,29,0],"armor":1,"fire":7,"torpedo":1,"bomb":1,"aac":1,"ass":1,"hit":1,"evasion":1,"seek":1,"range":4,"rarity":4,"dismantle":"[2,8,0,8]"}
,{"id":479,"name":"Mosquito FB Mk.VI","type":[21,38,47,37,51],"armor":0,"fire":0,"torpedo":5,"bomb":18,"aac":5,"ass":4,"hit":1,"evasion":0,"seek":5,"range":0,"rarity":4,"dismantle":"[9,11,0,4]"}
,{"id":480,"name":"Mosquito PR Mk.IV","type":[25,7,49,9,51],"armor":2,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":2,"evasion":0,"seek":9,"range":0,"rarity":3,"dismantle":"[10,0,0,5]"}
,{"id":481,"name":"Mosquito TR Mk.33","type":[3,5,8,8,51],"armor":0,"fire":0,"torpedo":8,"bomb":0,"aac":5,"ass":6,"hit":1,"evasion":0,"seek":6,"range":0,"rarity":4,"dismantle":"[9,12,0,5]"}
,{"id":482,"name":"特大発動艇+Ⅲ号戦車(北アフリカ仕様)","type":[8,14,24,20,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":5,"dismantle":"[2,4,5,2]"}
,{"id":483,"name":"三式弾改二","type":[4,28,18,12,0],"armor":0,"fire":5,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":1,"evasion":1,"seek":0,"range":0,"rarity":5,"dismantle":"[0,11,6,5]"}
,{"id":484,"name":"四式重爆 飛龍(熟練)+イ号一型甲 誘導弾","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":17,"bomb":21,"aac":5,"ass":4,"hit":3,"evasion":0,"seek":5,"range":0,"rarity":6,"dismantle":"[11,20,0,19]"}
,{"id":485,"name":"強風改二","type":[5,36,45,43,26],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":1,"evasion":4,"seek":2,"range":0,"rarity":4,"dismantle":"[2,1,0,7]"}
,{"id":486,"name":"零式艦戦64型(制空戦闘機仕様)","type":[3,5,6,6,12],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":9,"ass":0,"hit":1,"evasion":3,"seek":1,"range":0,"rarity":3,"dismantle":"[2,3,0,5]"}
,{"id":487,"name":"零式艦戦64型(熟練爆戦)","type":[3,5,7,7,12],"armor":0,"fire":1,"torpedo":0,"bomb":6,"aac":7,"ass":3,"hit":2,"evasion":0,"seek":2,"range":0,"rarity":4,"dismantle":"[2,4,0,5]"}
,{"id":488,"name":"二式爆雷改二","type":[7,32,15,17,0],"armor":1,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":8,"hit":1,"evasion":1,"seek":0,"range":0,"rarity":3,"dismantle":"[1,4,0,1]"}
,{"id":489,"name":"一式戦 隼II型改(20戦隊)","type":[3,16,26,22,52],"armor":0,"fire":2,"torpedo":0,"bomb":4,"aac":6,"ass":8,"hit":0,"evasion":3,"seek":0,"range":0,"rarity":4,"dismantle":"[2,2,0,4]"}
,{"id":490,"name":"試製 夜間瑞雲(攻撃装備)","type":[5,43,11,51,32],"armor":0,"fire":3,"torpedo":0,"bomb":10,"aac":4,"ass":6,"hit":2,"evasion":0,"seek":7,"range":0,"rarity":6,"dismantle":"[2,4,0,6]"}
,{"id":491,"name":"一式戦 隼III型改(熟練/20戦隊)","type":[3,16,26,22,52],"armor":0,"fire":2,"torpedo":0,"bomb":5,"aac":7,"ass":8,"hit":1,"evasion":3,"seek":0,"range":0,"rarity":5,"dismantle":"[2,3,0,5]"}
,{"id":492,"name":"零戦52型丙(八幡部隊)","type":[3,5,6,6,12],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":10,"ass":0,"hit":1,"evasion":1,"seek":0,"range":0,"rarity":3,"dismantle":"[1,2,0,3]"}
,{"id":493,"name":"一式陸攻(八幡部隊)","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":11,"bomb":12,"aac":3,"ass":2,"hit":1,"evasion":0,"seek":4,"range":0,"rarity":3,"dismantle":"[8,5,0,14]"}
,{"id":494,"name":"特大発動艇+チハ","type":[8,14,24,20,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[2,3,2,1]"}
,{"id":495,"name":"特大発動艇+チハ改","type":[8,14,24,20,0],"armor":0,"fire":1,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[2,4,2,1]"}
,{"id":496,"name":"陸軍歩兵部隊","type":[27,48,52,52,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[1,1,1,1]"}
,{"id":497,"name":"九七式中戦車(チハ)","type":[27,48,52,52,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":2,"dismantle":"[1,3,2,1]"}
,{"id":498,"name":"九七式中戦車 新砲塔(チハ改)","type":[27,48,52,52,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":3,"dismantle":"[1,4,2,1]"}
,{"id":499,"name":"陸軍歩兵部隊+チハ改","type":[27,48,52,52,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":0,"rarity":4,"dismantle":"[1,5,2,1]"}
,{"id":500,"name":"発煙装置(煙幕)","type":[28,49,54,54,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":1,"dismantle":"[1,0,0,1]"}
,{"id":501,"name":"発煙装置改(煙幕)","type":[28,49,54,54,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":3,"seek":0,"range":0,"rarity":2,"dismantle":"[2,0,0,2]"}
,{"id":502,"name":"35.6cm連装砲改三(ダズル迷彩仕様)","type":[1,1,3,3,0],"armor":2,"fire":20,"torpedo":0,"bomb":0,"aac":6,"ass":0,"hit":4,"evasion":3,"seek":0,"range":3,"rarity":5,"dismantle":"[0,20,24,12]"}
,{"id":503,"name":"35.6cm連装砲改四","type":[1,1,3,3,0],"armor":2,"fire":22,"torpedo":0,"bomb":0,"aac":5,"ass":0,"hit":4,"evasion":1,"seek":0,"range":3,"rarity":5,"dismantle":"[0,22,24,12]"}
,{"id":504,"name":"銀河(熟練)","type":[21,38,47,37,4],"armor":0,"fire":0,"torpedo":14,"bomb":15,"aac":3,"ass":3,"hit":2,"evasion":0,"seek":3,"range":0,"rarity":5,"dismantle":"[9,7,0,17]"}
,{"id":505,"name":"25mm対空機銃増備","type":[4,6,21,15,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":7,"ass":0,"hit":0,"evasion":2,"seek":0,"range":0,"rarity":3,"dismantle":"[0,3,2,1]"}
,{"id":506,"name":"電探装備マスト(13号改+22号電探改四)","type":[5,8,12,11,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":4,"ass":2,"hit":6,"evasion":2,"seek":5,"range":0,"rarity":4,"dismantle":"[0,0,18,25]"}
,{"id":507,"name":"14inch/45 連装砲","type":[1,1,3,3,0],"armor":1,"fire":16,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":1,"seek":0,"range":3,"rarity":1,"dismantle":"[0,10,16,0]"}
,{"id":508,"name":"14inch/45 三連装砲","type":[1,1,3,3,0],"armor":1,"fire":19,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":0,"seek":0,"range":3,"rarity":2,"dismantle":"[0,11,19,0]"}
,{"id":509,"name":"12cm単装高角砲E型改","type":[1,1,1,16,0],"armor":1,"fire":1,"torpedo":0,"bomb":0,"aac":4,"ass":2,"hit":1,"evasion":3,"seek":0,"range":1,"rarity":3,"dismantle":"[0,3,2,1]"}
,{"id":510,"name":"Walrus","type":[5,7,10,50,49],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":4,"hit":1,"evasion":0,"seek":4,"range":0,"rarity":3,"dismantle":"[2,2,0,4]"}
,{"id":511,"name":"21inch艦首魚雷発射管4門(初期型)","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":8,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":4,"seek":0,"range":1,"rarity":2,"dismantle":"[2,2,2,2]"}
,{"id":512,"name":"21inch艦首魚雷発射管4門(後期型)","type":[2,3,32,5,0],"armor":0,"fire":0,"torpedo":12,"bomb":0,"aac":0,"ass":0,"hit":3,"evasion":5,"seek":0,"range":1,"rarity":3,"dismantle":"[2,3,2,2]"}
,{"id":513,"name":"阻塞気球","type":[29,50,54,55,0],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":0,"hit":0,"evasion":1,"seek":0,"range":0,"rarity":2,"dismantle":"[1,0,0,1]"}
,{"id":514,"name":"特大発動艇+Ⅲ号戦車J型","type":[8,14,24,20,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":1,"ass":0,"hit":1,"evasion":0,"seek":0,"range":0,"rarity":5,"dismantle":"[2,5,5,2]"}
,{"id":515,"name":"Sea Otter","type":[5,7,10,50,49],"armor":0,"fire":0,"torpedo":0,"bomb":0,"aac":0,"ass":6,"hit":2,"evasion":0,"seek":5,"range":0,"rarity":4,"dismantle":"[3,3,0,5]"}
,{"id":516,"name":"Me 262 A-1a/R1","type":[22,39,48,56,55],"armor":0,"fire":0,"torpedo":0,"bomb":3,"aac":15,"ass":0,"hit":6,"evasion":1,"seek":0,"range":0,"rarity":6,"dismantle":"[7,4,11,15]"}
,{"id":517,"name":"逆探(E27)+22号対水上電探改四(後期調整型)","type":[5,8,12,11,0],"armor":0,"fire":2,"torpedo":0,"bomb":0,"aac":0,"ass":4,"hit":9,"evasion":5,"seek":8,"range":0,"rarity":5,"dismantle":"[0,0,17,20]"}
];