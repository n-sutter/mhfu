function generateTree(arrList)
{
  var txt = '';
//To avoid hard coding the position of items in the array,
//we will define them here
var costPos = 0; /*position of the cost of weapon in the array */
var affPos = 0; /*position of the Affinity in the array */
var slotPos = 0; /*position of the slot number in the array */
var rankPos = 0; /*position of the rank number in the array */
var atkPos = 0; /*position of the attack in the array */

//Sorry for encoding this in here, but the total number of LBG (non G) needs to be here
var numLBG = 109;

if(weapname == "Light Bowgun"){
	costPos = 15;
        affPos = 8; 
	slotPos = 9; 
	rankPos = 7;
	atkPos = 2;
}
else
{
	costPos = 2;
        affPos = 6;
        slotPos = 7;
        rankPos = 8;
	atkPos = 3;
}


  txt += '<table id="tableWeapons" cellpadding="0" cellspacing="0">';

	//Bowgun do not evolve so we don't need as much space between the name and the weapon specifics
	if(weapname == "Light Bowgun")
	  txt+='<tr><td style="width:4px;"></td><td><div style="width:150px"></div></td><td colspan="100"></td></tr>';
        else
	  txt+='<tr><td style="width:4px;"></td><td><div style="width:370px"></div></td><td colspan="100"></td></tr>';

	for (x=0;x<arrList.length;x++)
	{
	
	  header = false;
		if (arrList[x]["Info"][0]=='' && x < GWeap) header = true;
		else if (x == GWeap || x == altGWeap) header=true;
		else
		{
		  for(i=0;i<subpaths.length;i++)
		  if (x == subpaths[i])
			{ header=true; break; }
		}
		
	//very sensitive part
	//We want to display the title "Light Bowgun" only when we are in category Light bowgun
	//and not do so when a new weapon is being rendered
	//This is done this way as bowgun do not have paths (as opposed to other types of weapons). 
	  if( weapname == "Light Bowgun")
	  {
		if(x >= 1 && x < numLBG)
			header = false;
		else if ( x == numLBG  || x == GWeap || x == (GWeap+altGWeap))
			header = true;
		else if( x > numLBG && x < GWeap )
			header = false;


	  }
		if (header)
		{
 			hname= "";
                  if(weapname != "Light Bowgun")
		  	hname = arrList[x]["Info"][1]+' Path';
		  else
		  {
			if( x == 0)
				hname = weapname+"s";
			else if(x == numLBG)
				hname = altweapname+"s";

		  }


			if (x==GWeap)
			  hname = "G Weapons ("+weapname+")";
			else if (x==altGWeap && weapname!='Bows')
			  hname = "G Weapons ("+altweapname+")";
			else if (weapname == "Light Bowgun" && x==(altGWeap+GWeap))
			  hname = "G Weapons ("+altweapname+")";
				
			txt+='<tr><th colspan="100" style="font-size:4px;">&nbsp</th></tr>';
			txt+='<tr><th colspan="100" class="heading">'+hname+'</th></tr>';
			txt+='<tr>';
			  txt+='<th class="mini">&nbsp</th>';
			  txt+='<th class="mini" style="text-align:left;padding-left:20px;">Name</th>';
			  txt+='<th class="mini">Price</th>';
			  txt+='<th class="mini">Atk</th>';

			 if(weapname == "Light Bowgun")
			  {
				txt+='<th class="mini" >Max-Atk</th><th class="mini">Recoil</th><th class="mini">Reload</th>';

				if(x < numLBG || x == GWeap)
			  		txt+='<th class="mini" style="white-space:nowrap">Rapid Fire</th>';
				else
					txt +='<th class="mini" style="white-space:nowrap">&nbsp;</th>';

				txt+='<th class="mini" >Def</th>';
			   }
			  else
			  txt+='<th class="mini" colspan="2">Special</th>';
				if (weapname == 'Lances')
			    txt+='<th class="mini">Shelling</th>';				  
		    else if (weapname == 'Hammers')
			    txt+='<th class="mini">Notes</th>';
				if (weapname!='Bows' && weapname !='Light Bowgun')				  
			    txt+='<th class="mini">Sharpness</th>';

				//editing this part for Bowgun
				//The various menu need to be displayed (menu items unique to bowguns)
				if(weapname == "Light Bowgun")
				{
					txt+='<th class="mini">&nbsp;</th><th class="mini" style="white-space:nowrap" colspan="2">Normal Shots</th> \
					     <th class="mini" style="white-space:nowrap" colspan="2">Status Shots</th> \
					     <th class="mini" style="white-space:nowrap">Elemental</th> \
					     <th class="mini" style="white-space:nowrap">Tool Shots</th>';

				}
				if(weapname == 'Bows') 
				  txt+='<th class="mini">&nbsp;</th><th class="mini" colspan="4">Charge Levels (1 2 3 4)</th class="mini">\
					<th class="mini" colspan="5">Coatings</th>';

			  txt+='<th class="mini">Aff</th>';
			  txt+='<th class="mini">Slots</th>';
			  txt+='<th class="mini">Rank</th>';
			  txt+='<th class="mini">&nbsp</th>';
			txt+='</tr>';

			//another special item for bowguns (for lvl of shots T_T)
			if(weapname == "Light Bowgun")
			{
				txt+='<tr><th class="mini"  colspan="10">&nbsp;</th><th class="mini" colspan="2">'+
				'<div align="right" style="white-space:nowrap;font-size:11px">LV 1/2/3 &nbsp;&nbsp;</div></th> \
					<th class="mini" colspan="2"><div align="right" style="white-space:nowrap;font-size:11px">LV 1/2&nbsp;</div></th><th class="mini">Shots</th><th class="mini" colspan=5>&nbsp;</th></tr>';

			}
		}
		
		rows = 1;
	  if (x%2)
		  tdclass='odd';
		else tdclass='even';
		if (arrList[x]["Info"].length < 9)
		  tdrank = 'def';
		else
		  tdrank = 'rare'+arrList[x]["Info"][rankPos];
			
		if ( arrList[x]["Info"].length >= 9 )
		  cnStyle = arrList[x]["Info"][9];
		else
		  cnStyle = arrList[arrDuplicates[x]]["Info"][9];

	  txt+='<tbody id="weapext_'+x+'" class="'+tdclass+'"';
		if (arrList[x]["Info"].length > 5)
		  txt+=' onclick="this.style.display=\'none\';document.getElementById(\'weap_'+x+'\').style.display=\'\';">';
		else txt+='>';
	  txt+='<tr>';
		//txt+='<td class="'+tdrank+'">'+(parseInt(x)+1)+'</td>';
		txt+='<td rowspan="'+(rows+1)+'" style="width:4px;"></td>';
		txt+='<td >';//class="'+tdrank+'">';
  		for(i=0;i<arrList[x]["Info"][0].length;i++)
	  	{
			  txt+='<div class="cont" style="height:30px;">';
		    switch(arrList[x]["Info"][0].charAt(i))
				{
				  case 'L' : txt+= '<div class="dn"></div>';
					  break;
					case 'R' : txt+= '<div class="rt1"></div><div class="rt2"></div>';
					  break;
					case 'E' : txt+= '<div class="en"></div>';
					  break;
					case 'U' : txt+= '<div class="dh"></div>';
					  break;
					case 'C' : txt+= '<div class="rt1"><div class="rt2"></div></div><div class="rt2"></div>';
					  break;
					case 'B' : txt+= '<div class="rt2"></div><div class="en" style="margin-left:0"></div>';
					  break;
					default : txt+= '<div class="sp"></div>';
					  break;
				}//end switch
				txt+='</div>';
  		}//end for
    txt+='<div class="cn '+cnStyle+'">';
		if (arrList[x]["Info"].length < 9)
		{
		  txt+='<a class="dup" href="#alt_'+x+'"';
			//txt+=' onclick="document.getElementById(\'weap_'+arrDuplicates[x]+'\').style.display=\'none;\'';
			//txt+='document.getElementById(\'weapext_'+arrDuplicates[x]+'\').style.display=\'\';"';
			txt+='>'+arrList[x]["Info"][1]+'</a>';
		}
		else if (arrDuplicates[x])
		{
		  txt+='<a name="alt_'+arrDuplicates[x]+'">'+arrList[x]["Info"][1]+'</a>';
		}
		else
		  txt+=arrList[x]["Info"][1];
		txt+='</div>';
		if (x<arrList.length-1)
		{
		  y = parseInt(x)+1;
			if (arrList[y]["Info"][0].length > arrList[x]["Info"][0].length)
			{
			  if (arrList[y]["Info"][0].charAt( i )!='S') 
			    txt+= '<br><div class="cont" style="height:15px;"><div class="dn"></div></div>';
			}
		}
		

		
		txt2='';
		if (arrList[x]["Info"].length >= 9)
		{
		
  		txt2+='<td class="">'+arrList[x]["Info"][costPos]+'</td>';
		  txt2+='<td class="atk" style="text-align:right;">'+arrList[x]["Info"][atkPos]+'</td>';
		  //txt2+='<td class="">';//+arrList[x]["Info"][4]+
			

			sharp=arrList[x]["Info"][4].split(" ");

			if(weapname != "Light Bowgun") //the following parsing doesn't apply to Bowgun
			if (sharp.length==1)
			{
			  txt2+='<td>&nbsp</td><td><span class="rare6">'+sharp[0]+'</span></td>';
			}
			else if (sharp.length==2)
			{
			  txt2+='<td><span class="'+sharp[0]+'" style="white-space:nowrap">'+sharp[0]+' '+sharp[1]+'</span></td><td>&nbsp</td>';
			}
			else if (sharp.length==3)
			{
			  txt2+='<td><span class="'+sharp[0]+'" style="white-space:nowrap">'+sharp[0]+' '+sharp[1]+'</span></td><td><span class="rare6">'+sharp[2]+'</span></td>';
			}
			else if (sharp.length==4)
			{
			  txt2+='<td><span class="'+sharp[0]+'" style="white-space:nowrap">'+sharp[0]+' '+sharp[1]+'</span><br/><span class="'+sharp[2]+'">'+sharp[2]+' '+sharp[3]+'</span></td><td>&nbsp</td>';
			}
			else if (sharp.length==5)
			{
			  txt2+='<td><span class="'+sharp[0]+'" style="white-space:nowrap">'+sharp[0]+' '+sharp[1]+'</span><br/><span class="'+sharp[2]+'">'+sharp[2]+' '+sharp[3]+'</span></td><td><span class="rare6">'+sharp[4]+'</span></td>';
			}
		  if (weapname == 'Lances')
			{
			  if (cnStyle=='GL')
				  txt2+='<td class="rare4">'+arrList[x]["Info"][10]+'</td>';
				else
				  txt2+='<td>&nbsp</td>';
			}
		  if (weapname == 'Hammers')
			{
			  if (arrList[x]["Info"].length>11)
				{
			    sharp=arrList[x]["Info"][10].split(" ");
				  txt2+='<td><div style="white-space:nowrap;text-align:center;font-weight:bold;">';
					for (i=0;i<sharp.length;i++)
					  txt2+='<span class="note_'+sharp[i]+'">&#9834;</span>';
				  txt2+='</div></td>';
				}
				else
				  txt2+='<td>&nbsp</td>';
					
			}
			//+arrList[x]["Info"][5]+
			if (weapname !='Bows' && weapname !="Light Bowgun")
			{
		    txt2+='<td class="">';
			  sharp=arrList[x]["Info"][5].split(" ");
			  txt2+='<div class="gauge">';
				  sharp1=sharp[0].split(".");
					for(q in sharp1)
					{
					  w = parseInt(sharp1[q])*2;
					  txt2+='<div class="sharp'+q+'" style="width:'+w+'px"></div>';
					}
				txt2+='</div>';
				if (sharp[1])
				{
			  txt2+='<div class="gauge1">';
				 sharp1=sharp[1].split(".");
					for(q in sharp1)
					{
					  w = parseInt(sharp1[q])*2;
					  txt2+='<div class="sharp'+q+'" style="width:'+w+'px"></div>';
					}
				txt2+='</div>';
				}
				else
				{
			  txt2+='<div class="gauge" style="margin:0px;margin-bottom:4px;">';
					for(q in sharp1)
					{
					  w = parseInt(sharp1[q])*2;
					  txt2+='<div class="sharp'+q+'" style="width:'+w+'px"></div>';
					}
				txt2+='</div>';
				}
		  txt2+='</td>';				
			}

			else if(weapname == "Light Bowgun")
			{
				var maxAtkPos = 3;
				var defPos = 4;
				var reloadPos = 5;
				var recoilPos = 6;
				var rapidFirePos = 10;
				var normalShotPos = 11;
				var statShotPos = 12;
				var toolShotPos = 14;
				var elemShotPos = 13;

				//for many rapid fire
				var rfString = arrList[x]["Info"][rapidFirePos].replace(/\|/g,"<br>");
				//for normal shots
				var nsString = arrList[x]["Info"][normalShotPos].replace(/\|/g,"<br>");
				  //var  nsString = arrList[x]["Info"][normalShotPos].replace(/0/g,'-');

				var nsString2 = arrList[x]["Info"][normalShotPos].split("|");
				  //var  nsString2 = nsString.split("|");
				//for status Shots
				var ssString = arrList[x]["Info"][statShotPos].replace(/\|/g,"<br>");
				  //var ssString = arrList[x]["Info"][statShotPos].replace(/0/g,"-");

				var ssString2 = arrList[x]["Info"][statShotPos].split("|");
				  //var ssString2 = ssString.split("|");
			
				//for tool shots
				var tsString = arrList[x]["Info"][toolShotPos].replace(/\|/g,"<br>");
				//var tsString = arrList[x]["Info"][toolShotPos].replace(/0/g,"-");

				var tsString2 = arrList[x]["Info"][toolShotPos].split("|");
				//var tsString2 = tsString.split("|")

				//for element shots
				var elString = arrList[x]["Info"][elemShotPos].replace(/\|/g,"<br>");
				//var elString = arrList[x]["Info"][elemShotPos].replace(/0/g,"-");

				var elString2  = arrList[x]["Info"][elemShotPos].split("|");
				//var elString2 = elString.split("|");
				
				txt2+='<td><div class="atk" align="center" colspan=2>'+arrList[x]["Info"][maxAtkPos]+'</div></td> \
					<td><div class="" style="font-size:10px">'+
					arrList[x]["Info"][recoilPos]+'</div></td><td><div class="" align="center" style="font-size:10px">'+
					arrList[x]["Info"][reloadPos]+'</div></td>';

				//No rapid fire needed for HBG				
				if(x < numLBG || (x >= GWeap && x < (GWeap+altGWeap)))
					txt2+= '<td style="font-size:10px;white-space:nowrap;"><div class="note_G"\
					  align="center" style="font-size:10px">'+rfString+'</div></td>';
				else
					txt2+='<td style="font-size:10px;white-space:nowrap;"><div>&nbsp;</div></td>';

				txt2+=  '<td><div class="def" align="center">'+arrList[x]["Info"][defPos]+'</div></td><td>&nbsp;</td>'+
					//'<td><div class="" align="left" style="font-size:10px;white-space:nowrap;">'+nsString+'</div></td>'+
					'<td style="font-size:11px"><span>Normal:</span><br><span>Pierce:</span><br><span>Pellet:</span><br> \
					<span>Crag:</span><br><span>Clust:</span></td>'+
					'<td style="font-size:11px"><span style="white-space:nowrap;">'+nsString2[0]+'</span><br><span>'+nsString2[1]+
					'</span><br> \
					<span style="white-space:nowrap;">'+nsString2[2]+'</span><br><span>'+
					nsString2[3]+'</span><br><span style="white-space:nowrap;">'+nsString2[4]+'</span></td>'+

					//'<td><div class="" align="left" style="font-size:10px;white-space:nowrap;">'+ssString+'</div></td>'+
					//Status shot title
					'<td style="font-size:11px"><span class="note_G">RecovS:</span><br>\
					<span class="Poi">PoisonS:</span><br><span class="Par">Para S:</span><br>\
					<span class="Slp">Sleep S</span></td>'+
					
					//status shot entries
					'<td style="font-size:11px"><span class="note_G">'+ssString2[0]+'</span><br>\
					<span class="Poi">'+ssString2[1]+'</span><br><span class="Par">'+ssString2[2]+'</span><br>\
					<span class="Slp">'+ssString2[3]+'</span></td>'+

					//'<td><div class="" align="left" style="font-size:10px;white-space:nowrap;">'+elString+'</div></td>'+

					//elemental shots title
					//'<td style="font-size:11px;white-space:nowrap;"><span class="Fir">Flame S</span><br>'+
					//'<span class="Wat">Water S</span><br><span class="Thn">Thundr S</span>\
					//<br><span class="Ice">Freeze S</span><br><span class="Drg">Dragon S</span></td>'+

					//elemental Shot entries
					'<td style="font-size:11px;white-space:nowrap;"><div align="right" class="Fir">'+elString2[0]+'</div>'+
					'<div align="right" class="Wat">'+elString2[1]+'</div><div align="right" class="Thn">'+elString2[2]+'</div>\
					<div align="right" class="Ice">'+elString2[3]+'</div><div align="right" class="Drg">'+
					elString2[4]+'</div></td>'+
					//'<td><div class="" align="left" style="font-size:10px;white-space:nowrap;">'+tsString+'</div></td>';
					'<td style="font-size:11px;white-space:nowrap;"><div class="rare8" align="right">'+tsString2[0]+
					'</div><div class="Pai" align="right">'+
					 tsString2[1]+'</div><div class="rare8" align="right">'+tsString2[2]+'</div><div class="rare7" align="right">'+
					 tsString2[3]+'</div></td>';


			}
			else
			{
				txt2+='<td><div style="width:6px"></div></td>';
			  sharp=arrList[x]["Info"][10].split(" ");
			  txt2+='<td class="'+sharp[0]+'" style="font-size:10px;white-space:nowrap;">'+arrList[x]["Info"][10]+'</td>';
			  sharp=arrList[x]["Info"][11].split(" ");
			  txt2+='<td class="'+sharp[0]+'" style="font-size:10px;white-space:nowrap;">'+arrList[x]["Info"][11]+'</td>';
			  sharp=arrList[x]["Info"][12].split(" ");
			  txt2+='<td class="'+sharp[0]+'" style="font-size:10px;white-space:nowrap;">'+arrList[x]["Info"][12]+'</td>';
			  sharp=arrList[x]["Info"][13].split(" ");
			  txt2+='<td class="'+sharp[0]+'" style="font-size:10px;white-space:nowrap;">'+arrList[x]["Info"][13]+'</td>';
				txt2+='<td><div style="width:6px"></div></td>';
			  sharp=arrList[x]["Info"][5].split(" ");
				txt2+='<td style="font-size:10px;">';
				txt2+='<span class="'+sharp[0]+'">'+sharp[0]+'</span><br>';
				txt2+='<span class="'+sharp[1]+'">'+sharp[1]+'</span>';
				txt2+='</td>';
				txt2+='<td style="font-size:10px;">';
				txt2+='<span class="'+sharp[2]+'">'+sharp[2]+'</span><br>';
				txt2+='<span class="'+sharp[3]+'">'+sharp[3]+'</span>';
				txt2+='</td>';
				txt2+='<td style="font-size:10px;">'
				txt2+='<span class="'+sharp[4]+'">'+sharp[4]+'</span><br>';
				txt2+='<span class="'+sharp[5]+'">'+sharp[5]+'</span>';
				txt2+='</td>';
				txt2+='<td><div style="width:6px"></div></td>';
			}

			//insert here

		  txt2+='<td class="" style="text-align:center;">';


			if ( parseInt(arrList[x]["Info"][affPos]) < 0)
			  txt2+='<span class="affnegative">'+arrList[x]["Info"][affPos]+'</span>';
			else if (parseInt(arrList[x]["Info"][affPos])>0)
			  txt2+='<span class="affPositive">'+arrList[x]["Info"][affPos]+'</span>';
			else txt2+=arrList[x]["Info"][affPos];
			txt2+='</td>';
		  txt2+='<td class="" style="text-align:center;">'+arrList[x]["Info"][slotPos]+'</td>';
		  txt2+='<td class="'+tdrank+'" style="text-align:center;">'+arrList[x]["Info"][rankPos];
			txt2+='</td>';
                   

			/*
		  if (weapname == 'Hammers')
			{
			  if (arrList[x]["Info"].length>11)
				{
			    sharp=arrList[x]["Info"][11].split("|");
				  txt2+='<td><div style="white-space:nowrap;overflow-y:scroll;height:30px;">';
					for (i=0;i<sharp.length;i++)
					  txt2+=sharp[i]+'<br>';
				  txt2+='</div></td>';
				}
				else
				  txt2+='<td>&nbsp</td>';
			}//*/
		}
		else 
		{
		  txt2+="<td class='' colspan='8'><div class='mini'>";
			txt2+='<a class="dup" href="#alt_'+x+'"';
			//txt+=' onclick="document.getElementById(\'weap_'+arrDuplicates[x]+'\').style.display=\'none;\'';
			//txt+='document.getElementById(\'weapext_'+arrDuplicates[x]+'\').style.display=\'\';"';
			txt2+='>'+arrList[x]["Info"][costPos]+'</a>';
      txt2+="</div></td>";
			if (weapname=='Lances' || weapname=='Hammers')
			  txt2+='<td>&nbsp</td>';
		}

		

    txt+=txt2;
		txt+='<td rowspan="'+(rows+1)+'" style="width:10px;"></td>';
	  txt+='</tr>';
		txt+='</tbody>';
				
		if (arrList[x]["Info"].length > 5)
		{

	  txt+='<tbody id="weap_'+x+'" class="'+tdclass+'" style="display:none;" onclick="this.style.display=\'none\';document.getElementById(\'weapext_'+x+'\').style.display=\'\';">';
		if (arrList[x]["Improve"])  rows++;
		if (arrList[x]["Create"])   rows++;
		if (arrList[x]["Shortcut"]) rows++;
	  txt+='<tr>';
		//txt+='<td rowspan="'+(rows+1)+'" class="'+tdrank+'">'+(parseInt(x)+1)+'</td>';
		txt+='<td rowspan="'+(rows+1)+'" style="width:4px;"></td>';
		txt+='<td rowspan="'+(rows+1)+'" >';//class="'+tdrank+'">';
  		for(i=0;i<arrList[x]["Info"][0].length;i++)
	  	{
			  h=rows*20+12;
			  txt+='<div class="cont" style="height:'+h+'px;">';
		    switch(arrList[x]["Info"][0].charAt(i))
				{
				  case 'L' : txt+= '<div class="dn"></div>';
					  break;
					case 'R' : txt+= '<div class="rt1"></div><div class="rt2"></div>';
					  break;
					case 'E' : txt+= '<div class="en"></div>';
					  break;
					case 'U' : txt+= '<div class="dh"></div>';
					  break;
					case 'C' : txt+= '<div class="rt1"><div class="rt2"></div></div><div class="rt2"></div>';
					  break;
					case 'B' : txt+= '<div class="rt2"></div><div class="en" style="margin-left:0"></div>';
					  break;
					default : txt+= '<div class="sp"></div>';
					  break;
				}//end switch
				txt+='</div>';
  		}//end for
    txt+='<div class="cn '+cnStyle+'">';
		txt+=arrList[x]["Info"][1];
		txt+='</div>';
		if (x<arrList.length-1)
		{
		  y = parseInt(x)+1;
			if (arrList[y]["Info"][0].length > arrList[x]["Info"][0].length)
			{
			  if (arrList[y]["Info"][0].charAt( i )!='S') 
				{
				  switch(rows)
					{
					  case 3 : h=56; break;
					  case 4 : h=76; break;
					  default: h=36; break;
					}
			    txt+= '<br><div class="cont" style="height:'+h+'px;"><div class="dn"></div></div>';
				}
			}
		}			
		txt+='</td>';

		txt+=txt2;
		txt+='<td rowspan="'+(rows+1)+'" style="width:10px;"></td>';
	  txt+='</tr>';

		if (arrList[x]["Improve"])
		{
		  txt+="<tr><td class='mat'>Improve</td><td class='mat1' colspan='100'>";
			matlist=arrList[x]["Improve"].split("|");
			for(q in matlist)
			{
			  r = matlist[q].split(":");
				txt+=r[0]+': <span class="rare4">'+r[1]+'</span> &nbsp ';
			}
		  txt+="</td></tr>";
		}
		if (arrList[x]["Create"])
		{
		  txt+="<tr><td class='mat'>Create</td><td class='mat1' colspan='100'>";
			matlist=arrList[x]["Create"].split("|");
			for(q in matlist)
			{
			  r = matlist[q].split(":");
				txt+=r[0]+': <span class="rare4">'+r[1]+'</span> &nbsp ';
			}
		  txt+="</td></tr>";
		}
		if (arrList[x]["Shortcut"])		
		{
		  txt+="<tr><td class='mat'>Shortcut</td><td class='mat1' colspan='100'>";
			matlist=arrList[x]["Shortcut"].split("|");
			for(q in matlist)
			{
			  r = matlist[q].split(":");
				txt+=r[0]+': <span class="rare4">'+r[1]+'</span> &nbsp ';
			}
		  txt+="</td></tr>";
		}
		if (arrList[x]["Info"].length>8)
		  txt+='<tr><td colspan=100 class="mat1" style="height:5px;font-size:2px">&nbsp</td></tr>';
		txt+='</tbody>';
		}//end expanded */
		
		txt+='<tr><td colspan=100 style="height:1px"></td></tr>';

	}
 	txt += '</table>';
	
	document.getElementById('divContents').innerHTML = txt;
	
	//document.getElementById('scriptContent').innerHTML = txt;
}

function expandAll(arrList, expand)
{
  x = document.getElementById('tableWeapons').tBodies;
	for (i=0;i<x.length;i++)
	{
	  if (x[i].id.length>5)
		if (x[i].id.substr(0,5) == 'weap_')
		{
		  if (expand)
			  x[i].style.display='';
			else
			  x[i].style.display='none';
		}
		else
		{
		  if (x[i].getElementsByTagName('a').length<2)
			{
		  if (expand)
			  x[i].style.display='none';
			else
			  x[i].style.display='';
			}
		}
  }  
}