


$(document).ready(function(){

	var jsonData;


	//Clear Data 
	$("#btnClear").click(function(){
		$("#showDataTable").fadeOut();
		$("#showDataTable").empty();
		$("#DashBoard").fadeOut();
		$("#activityPieChart").empty();
		$("#likesPieChart").empty();
		$("#sharesPieChart").empty();
		$(".Buttons").fadeOut();
		
	});

$("#btnLoadJSON").click(function(){

	// Pull JSON
	$.getJSON($("#jsonPath").val().trim(), function(json){
		$("#btnClear").click();
		jsonData = json;
		if(JSON.stringify(jsonData)!="{}" && JSON.stringify(jsonData)!="[{}]")
		{
			//generate data for dashboard
			var lowestDate ;
			var highestDate ;
			var positivePerception = 0 ;
			var negativePerception = 0 ;
			var neutralPerception = 0 ;
			var positiveActivities = 0 ;
			var negativeActivities = 0 ;
			var neutralActivities = 0 ;
			var positiveShares = 0 ;
			var negativeShares = 0 ;
			var neutralShares = 0 ;
			$.each(jsonData, function( index, value ) 
			{
				//Calculate positive, negative and neutral perceptions to get brand image
				if(value.activity_sentiment == 1)
				{
					positivePerception += value.activity_likes;
					positiveShares+= value.activity_shares;
					++positiveActivities;
				}
				else if(value.activity_sentiment == -1)
				{
					negativePerception += value.activity_likes;
					negativeShares+= value.activity_shares;
					++negativeActivities;
				}
				else if(value.activity_sentiment == 0)
				{
					neutralPerception += value.activity_likes;
					neutralShares+= value.activity_shares;
					++neutralActivities;
				}

				//Calculate time period for data
				if(isNaN(lowestDate) && isNaN(highestDate) )
				{
					
					lowestDate = moment(value.activity_date,"YYYY-MM-DD"); 
					highestDate = moment(value.activity_date,"YYYY-MM-DD");
					
				}
				//determine earliest date in json
				if(moment(lowestDate,"YYYY-MM-DD").isAfter(moment(value.activity_date,"YYYY-MM-DD"), 'day'))
				{
				     lowestDate = moment(value.activity_date,"YYYY-MM-DD"); 
				}
				//determine latest date in json
				if(moment(value.activity_date,"YYYY-MM-DD").isAfter(highestDate, 'day'))
				{
				     highestDate = moment(value.activity_date,"YYYY-MM-DD"); 
				}
			});

			lowestDate = moment(lowestDate,"YYYY-MM-DD").format("DD MMM YYYY");
			highestDate =moment(highestDate,"YYYY-MM-DD").format("DD MMM YYYY");
			$("#Dates").html(lowestDate + " to "+ highestDate);

			//Piecharts
			$("#DashBoard").fadeToggle();
			$(".Buttons").fadeToggle();
			createPieChart("activityPieChart","Social Media Activities", "Shows Positive, Negative and Neutral Activities",neutralActivities,positiveActivities,negativeActivities);
			createPieChart("likesPieChart","Brand Perception", "Shows Positive, Negative and Neutral Activity Likes",neutralPerception,positivePerception,negativePerception);
			createPieChart("sharesPieChart","Brand Involvement", "Shows Positive, Negative and Neutral Activity Shares",neutralShares,positiveShares,negativeShares);



	    	var content = "";
	    	content+= '<table id="ActivityData" class="display">';
	    	content+= '<thead>';
	    	content+= '<tr>';
	    	content+= '<th>Id</th>';
	    	content+= '<th>Username</th>';
	    	content+= '<th>Actor_description</th>';
	    	content+= '<th>Actor_name</th>';
	    	content+= '<th>Actor_avator</th>';
	    	content+= '<th>Actor_url</th>';
	    	content+= '<th>Provider</th>';
	    	content+= '<th>Activity_url</th>';
	    	content+= '<th>Activity_latitude</th>';
	    	content+= '<th>Activity_longitude</th>';
	    	content+= '<th>Activity Date</th>';
	    	content+= '<th>Activity Message</th>';
	    	content+= '<th>Activity_likes</th>';
	    	content+= '<th>Activity_shares</th>';
	    	content+= '<th>Activity_comments</th>';
	    	content+= '<th>Attachment</th>';
	    	content+= '<th>Attachment_type</th>';
	    	content+= '<th>Activity_sentiment</th>';
	    	content+= '</tr>';
	    	content+= '</thead>';
	    	content+= '<tbody>';
		    	$.each(jsonData, function( index, value ) {
		    		content+= '<tr>';
		    		content+= '<td>'+ value.id +'</td>';
			    	content+= '<td>'+ value.actor_username+'</td>';
			    	content+= '<td>'+ value.actor_description +'</td>';
			    	content+= '<td>'+ value.actor_name+'</td>';
			    	content += '<td>' + getLinkOrText(value.actor_avator) + '</td>';
					content += '<td>' + getLinkOrText(value.actor_url) + '</td>';
			    	content+= '<td>'+ value.provider+'</td>';
			    	content += '<td>' + getLinkOrText(value.activity_url) + '</td>';
			    	content+= '<td>'+ value.activity_latitude+'</td>';
			    	content+= '<td>'+ value.activity_longitude+'</td>';
			    	content+= '<td>'+ moment(value.activity_date,"YYYY-MM-DD").format("DD MMM YYYY");+'</td>';
			    	content += '<td>' + getLinkOrText(value.activity_message) + '</td>';
			    	content+= '<td>'+ value.activity_likes+'</td>';
			    	content+= '<td>'+ value.activity_shares+'</td>';
			    	content+= '<td>'+ value.activity_comments+'</td>';
			    	content += '<td>' + getLinkOrText(value.activity_attachment) + '</td>';
			    	content+= '<td>'+ value.activity_attachment_type+'</td>';
			    	content+= '<td>'+ value.activity_sentiment+'</td>';
		  			content+= '</tr>';
				});

		    content += "</tbody></table>";
	    	$("#showDataTable").html(content);
	    	$("#showDataTable").fadeIn();
	    	$('#ActivityData').DataTable({

	    		"autoWidth": false, 
	    		
	    		"colReorder": true,

	    		"lengthMenu": [ 10, 20, 30, 50],

	    		"dom": 'Blfrtip',
	        	"buttons": ['colvis', 'copy', 'excel'],

	        	"columnDefs": [
		            {
		                "targets": [ 0 ],
		                "visible": false,
		                "searchable": false,
		                "responsivePriority": 18
		            },
		            {
		                "targets": [ 1 ],
		                "responsivePriority": 1
		            },
		            {
		                "targets": [ 2 ],
		                "visible": false,
		                "searchable": false,
		                "responsivePriority": 17
		            },
		            {
		                "targets": [ 3 ],
		                "visible": false,
		                "searchable": false
		                ,
		                "responsivePriority": 16
		            },
		            {
		                "targets": [ 4 ],
		                "visible": false,
		                "searchable": false,
		                "responsivePriority": 15
		            },
		            {
		                "targets": [ 5 ],
		                "visible": false,
		                "searchable": false,
		                "responsivePriority": 14
		            },
		            {
		                "targets": [ 6 ],
		                "responsivePriority": 2
		            },
		            {
		                "targets": [ 7 ],
		                "visible": false,
		                "searchable": false,
		                "responsivePriority": 13
		            },
		            {
		                "targets": [ 8 ],
		                "visible": false,
		                "searchable": false,
		                "responsivePriority": 12
		            },
		            {
		                "targets": [ 9 ],
		                "visible": false,
		                "searchable": false,
		                "responsivePriority": 11
		            },
		            {
		                "targets": [ 10 ],
		                "responsivePriority": 3
		            },
		            {
		                "targets": [ 11 ],
		                "responsivePriority": 4
		            },
		            {
		                "targets": [ 12 ],
		                "responsivePriority": 5
		            },
		            {
		                "targets": [ 13 ],
		                "responsivePriority": 6
		            },
		            {
		                "targets": [ 14 ],
		                "responsivePriority": 7
		            },
		            {
		                "targets": [ 15 ],
		                "visible": false,
		                "searchable": false,
		                "responsivePriority": 8
		            },
		            {
		                "targets": [ 16 ],
		                "visible": false,
		                "searchable": false,
		                "responsivePriority": 9
		            },
		            {
		                "targets": [ 17],
		                "visible": false,
		                "searchable": false,
		                "responsivePriority": 10
		            }

		        ]
	        });
	        
			$("html, body").animate({ scrollTop: 0 }, "slow");
		  }

	});

});

	//Toggle Dashboard
$("#btnDisplayDashBoard").click(function(){
    $("#DashBoard").fadeToggle();

});

//Toggle Datatable
	$("#btnDisplayTable").click(function(){
		$("#showDataTable").fadeToggle();
    });

  

});
    
function createPieChart(divName, title, explanation, neutral, positive, negative)
{
	var pie = new d3pie(divName, {
	"header": {
		"title": {
			"text": title,
			"fontSize": 22,
			"font": "verdana"
		},
		"subtitle": {
			"text": explanation,
			"color": "#999999",
			"fontSize": 10,
			"font": "verdana"
		},
		"titleSubtitlePadding": 12
	},
	"footer": {
		"color": "#999999",
		"fontSize": 11,
		"font": "open sans",
		"location": "bottom-center",
		"text": "Please move mouse over to see percentages"
	},
	"size": {
		"canvasHeight": 350,
		"canvasWidth": 350,
		"pieOuterRadius": "73%"
	},
	"data": {
		"content": [
			{
				"label": "Negative",
				"value": negative,
				"color": "#cc2e5b"
			},
			{
				"label": "Neutral",
				"value": neutral,
				"color": "#cab04c"
			},
			{
				"label": "Positive",
				"value": positive,
				"color": "#639c79"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"format": "value"
		},
		"mainLabel": {
			"font": "verdana"
		},
		"percentage": {
			"color": "#1f1e2a",
			"font": "verdana",
			"decimalPlaces": 2
		},
		"value": {
			"color": "#cccccc",
			"font": "verdana"
		},
		"lines": {
			"enabled": true,
			"color": "#583333"
		},
		"truncation": {
			"enabled": true
		}
	},
	"tooltips": {
		"enabled": true,
		"type": "placeholder",
		"string": "{label}: {percentage}%"
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	}
});

	return 0;
}

function getLinkOrText(val) {
  
  if(val!= null && (new RegExp("http").test(val)))
	return '<a href="'+val+'"  target="_blank">'+val+'</a>';
  else
	return val;	
}