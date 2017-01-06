var Geofence = require('../models/Geofences').Geofence;

var arr=['TML Pimpri','tml_Canteen','tml_Carplant_CarStor','tml_Carplant_ENGBIW','tml_Carplant_TcfPnt',
'tml_Carplant_Yard','tml_Carpln_L','tml_EFFOpen','tml_LOADBDY','tml_MEDOpen','tml_POWERH','tml_TESTTRACK',
'tml_block_A','tml_block_A0','tml_block_B','tml_block_C','tml_block_D','tml_block_E10E12','tml_block_E1E10',
'tml_block_ERC','tml_block_H','tml_block_I','tml_block_J','tml_carplant_Central'];

for(var i=0;i<arr.length;i++){	
console.log(arr[i]);
	Geofence.create({
		geo_name:arr[i],
		status:'ACTIVE',
		created_by:'Admin',
		updated_by:'Admin',		
	})
	.then(function (geofences) {
		console.log('success');
	}, function (err) {
		console.log(err);    	
	});
}