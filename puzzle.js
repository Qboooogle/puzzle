/*HW7_game_puzzle of web2.0, qiangbo_14331229,group 11*/
/*the .js of the game_puzzle*/

  
/**/
window.onload=function(){

	var count = 0;
	var if_mess = 0;
	var if_success = 0;
    var form_x = 0;
    var form_y  =0;
    
	/*Form the original block*/   
    for (var k = 0; k <4; k++) {
		form_y = 200 + 80 *k;
		for(var i = 0;i<4;i++) {
			form_x = 325 + 80 * i;
			form_position(form_x, form_y,count);
			count++;			    	
		}
	}
 
    //Have a mess game.
    function rand_again() {
        
    	//Get 15 rand number.
    	var rand_arr = new Array([16]);
    	
    	var l = 1;
    	var if_add = true;
        
    	//The first rand.
    	var rand = Math.floor(Math.random()*100) % 16;
    	rand_arr[0] = rand;

    	//Get 15 rand.
    	while(l < 16) {
    		var randx = Math.floor(Math.random()*100) % 16;
             
             //the randx has no apperal.
    		for (var k = 0; k < l; k++) {
    			if (randx == rand_arr[k]) if_add = false; //no add.
    		}

    		if (if_add) {
    			rand_arr[l] = randx;
    			l++;
    		}

    		if_add = true;
    	}

        //change the calssname of the 15_block
    	for(var m = 0; m < 8; m++) {
    		var temp = rand_arr[m];
    		var temp1 = rand_arr[15-m];
    		document.getElementById("puzzle"+temp1).className = 'pu_css'+temp;
    		document.getElementById("puzzle"+temp).setAttribute("class", "pu_css"+temp1);
    	}
    }
    
     /*The botton to start*/
	
    document.getElementById("shufflebutton").onclick = function() {
    	if (if_mess == 0) {
    		if_mess = 1;

    		rand_again();	
    	} 	
    }

    //Click the 16 bottons to start game. 
    for (var counter = 0; counter< 16; counter++) {
    	to_onclick(counter);
    }

    function to_onclick(counter) {
        document.getElementById("puzzle"+ counter).onclick = function() {
    		var ID1 = "puzzle"+ counter;
    		var ID2;
    		for(var find = 0; find < 16; find++) {
    			if (document.getElementById("puzzle"+ find).className == "pu_css15") ID2 = find;
    		}
        	var C1 = String(document.getElementById("puzzle"+ counter).className);
        	var C2 = 'pu_css15';
            if_move(ID1,ID2,C1,C2);
        }
    }
    

    
    // if the bolck can be move,we call this function to decide.
	function if_move(ID1,ID2,C1,C2) {
		var number1 = ID1.substr(6,8) - 0;
		var number2 = ID2;

        if (number1 + 4 == number2 ||
        	number1 - 4 == number2 ||
        	number1 + 1 == number2 ||
        	number1 - 1 == number2 ) {
        	move_change(number1, ID2, C1, C2);
        	if_succeed();      
        }
	}
    
    //Change the two block.
	function move_change(ID1, ID2, C1, C2) {
		document.getElementById('puzzle'+ID1).setAttribute("class", C2);
        document.getElementById('puzzle'+ID2).setAttribute("class", C1);
	}


	/*to creat the 1/2 puzzle box*/	
    function form_position(x, y,count) {
    	var button_move = document.createElement("input");
        button_move.setAttribute("type","button");
	    //var button_move = document.createElement("div");
	    button_move.style.position="absolute";
	    button_move.style.left =  x + 'px';
	    button_move.style.top =  y + 'px';
	    button_move.setAttribute("class", "pu_css"+count);
	    button_move.setAttribute("id", "puzzle"+count);
	    document.getElementById("puzzleblock").appendChild(button_move); 

    }

    //Over the game and win.
	function if_succeed() {
		if_mess = 0;
		for (var succ = 0; succ < 16; succ++) {
			no_succeed(succ);
		}
		function no_succeed(succ) {
			if (document.getElementById("puzzle"+succ).className != 'pu_css'+succ) if_success = 1;
		}
        if (if_success == 0) alert("Congratulation!\nYou Win!");
        if_success = 0;
	}

}