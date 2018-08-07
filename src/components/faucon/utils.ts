export class Utils {

	constructor() {

	}

	loadJSON(filename: string, callback: any) {   



		// let json = {
		// 	"width": 960,
		// 	"height": 540,
		// 	"logique": [
		// 		{
		// 			"position": "1",
		// 			"suivant": ["2"],
		// 			"intervalle": [0, 76],
		// 			"prefixe": "droite",
		// 			"extension": "jpg"
		// 		},
		// 
		// 		{
		// 			"position": "2", 
		// 			"suivant": ["3"],
		// 			"intervalle": [0, 100],
		// 			"prefixe": "lignedroite_deux",
		// 			"extension": "png"
		// 		},
		// 		{
		// 			"position": "3", 
		// 			"suivant": ["4"],
		// 			"intervalle": [0, 33],
		// 			"prefixe": "lignedroite_trois",
		// 			"extension": "png"
		// 		},
		// 		{
		// 			"position": "4",
		// 			"suivant": ["2"],
		// 			"intervalle": [25, 76],
		// 			"prefixe": "droite",
		// 			"extension": "jpg"
		// 		},
		// 		{
		// 			"position": "5",
		// 			"suivant": ["5"],
		// 			"intervalle": [101, 103],
		// 			"prefixe": "suzanne",
		// 			"extension": "png",
		// 			"accessoire": true
		// 		}
		// 	]
		// };
		// callback(json);
		

		var xobj = new XMLHttpRequest();
				xobj.overrideMimeType("application/json");
		xobj.open('GET', filename, true); // Replace 'my_data' with the path to your file
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status === 200) {
				// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
				callback(JSON.parse(xobj.responseText));
			} else {
      
      }
		};
		xobj.send(null);  
	}

}



