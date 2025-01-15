var currentUseCase = "";
var securityContext = "";
var currentTable = "";
var startDate ="";
var endDate ="";
var LogHistory = {
	build: function() {
		var that = LogHistory;
		$(document).ready(function() {
			that.addEvents();
			$("#LIBRARY_FROM_EDM_TAB").trigger('click');
		});
	},

	addEvents: function() {
		$(".myInput").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			if (!isNullUndefinedEmpty(value)) {
				$("#myTable1 tr,#myTable2 tr,#myTable3 tr,#myTable4 tr").filter(function() {
					if (!$(this).hasClass("danger")) {
						var rowValue = $(this).text().toLowerCase();
						var title = $($($(this).children("td")[0]).children("a")[0]).attr("title");
						title = isNullUndefinedEmpty(title) ? title : title.toLowerCase();
						rowValue = rowValue + " " + title;
						if (rowValue.indexOf(value) > -1) {
							$(this).addClass("shown");
							$(this).show();
							$(".no-results-found").hide();
						}
						else {
							$(this).removeClass("shown");
							$(this).hide();
							if ($(".shown").length <= 0) {
								$(".no-results-found").show();
							}
						}
					}
				});
			}
			else {
				$("#myTable1 tr,#myTable2 tr,#myTable3 tr,#myTable4 tr").filter(function() {
					if ($(".shown").length <= 0) {
						$(".no-results-found").show();
					}
					else {
						$(".no-results-found").hide();
					}
					$(this).show();
				});
			}
		});
		$(".fa-sort").on("click", function() {
			var table = $(this).attr("parentId");
			var column = $(this).attr("column");
			LogHistory.sort(table, column);
		});

		$(".close").on('click', function() {
			$("#myModal").hide();
			$("#contentModel").html('');
		});
		$("#cancel").on('click', function() {
			$("#myModal").hide();
			$("#contentModel").html('');
		});
		// Task 5777 START
		$(".datePicker").on('apply.daterangepicker',function(){
			var input = document.querySelector('input[name="daterange"]').value;
			console.log(input);
    		var inputArray = input.split(' - ');
    		startDate = inputArray[0];
		    endDate =	inputArray[1];
		    $(".myTabClass").find("tr:gt(0)").remove();
		    $(".no-results-found").hide();
		    LogHistory.getLogHistory(currentUseCase, currentTable);
		});
		// Task 5777 END
		
		$("#LIBRARY_FROM_EDM_TAB").on('click', function() {
			$("#EDM").show();
			$(".LIBRARY_FROM_EDM_TAB").addClass("selected");
			$(".LIBRARY_FROM_3DEX_TAB").removeClass("selected");
			$(".DESIGN_SYNCH_TAB").removeClass("selected");
			$(".CLONE_TAB").removeClass("selected");
			$("#3DEX").hide();
			$("#DESIGN").hide();
			$("#CLONE").hide();
			$("#EDM").find("tr:gt(0)").remove();
			currentUseCase = "Library Synchronization From EDM";
			currentTable = "LIBRARY_FROM_EDM";
			LogHistory.getLogHistory(currentUseCase, currentTable);
		});
		$("#LIBRARY_FROM_3DEX_TAB").on('click', function() {
			$(".LIBRARY_FROM_EDM_TAB").removeClass("selected");
			$(".LIBRARY_FROM_3DEX_TAB").addClass("selected");
			$(".DESIGN_SYNCH_TAB").removeClass("selected");
			$(".CLONE_TAB").removeClass("selected");
			$("#EDM").hide();
			$("#3DEX").show();
			$("#DESIGN").hide();
			$("#CLONE").hide();
			$("#3DEX").find("tr:gt(0)").remove();
			currentUseCase = "Library Synchronization From 3DEXPERIENCE";
			currentTable ="LIBRARY_FROM_3DEX";
			LogHistory.getLogHistory(currentUseCase, currentTable);
		});

		$("#DESIGN_SYNCH_TAB").on('click', function() {
			$(".LIBRARY_FROM_EDM_TAB").removeClass("selected");
			$(".LIBRARY_FROM_3DEX_TAB").removeClass("selected");
			$(".DESIGN_SYNCH_TAB").addClass("selected");
			$(".CLONE_TAB").removeClass("selected");
			$("#EDM").hide();
			$("#3DEX").hide();
			$("#CLONE").hide();
			$("#DESIGN").show();
			$("#DESIGN").find("tr:gt(0)").remove();
			currentUseCase = "Design Synchronization";
			currentTable ="DESIGN_SYNCH";
			LogHistory.getLogHistory(currentUseCase, currentTable);
		});
		$("#CLONE_TAB").on('click', function() {
			$(".LIBRARY_FROM_EDM_TAB").removeClass("selected");
			$(".LIBRARY_FROM_3DEX_TAB").removeClass("selected");
			$(".DESIGN_SYNCH_TAB").removeClass("selected");
			$(".CLONE_TAB").addClass("selected");
			$("#EDM").hide();
			$("#3DEX").hide();
			$("#CLONE").show();
			$("#DESIGN").hide();
			$("#CLONE").find("tr:gt(0)").remove();
			currentUseCase = "Import Project From 3DEXPERIENCE";
			currentTable ="CLONE_PLM";
			LogHistory.getLogHistory(currentUseCase, currentTable);
		});
		
		$(".consolidate-Report-download").on("click", function() {
			var selectedValue = $("#dropdown").val();
			var urlToSend = solutionContext + "/download-report?startDate="+startDate+"&endDate="+endDate+"&useCase="+currentUseCase+"&userId="+userId;
			var req = new XMLHttpRequest();
			req.open("GET", urlToSend, true);
			req.responseType = "blob";
			req.onload = function(event) {
				var blob = req.response;
				var fileName = req.getResponseHeader("fileName")
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = fileName;
				link.click();
			};
			req.send();
		});
	},

	getLogHistory: function(useCase, divId) {
		var formData = {
			'useCase': useCase,
			'userId': getUserId
		};
		$.ajax({
			method: "GET",
			url: solutionContext + "/getLogFiles?startDate="+startDate+"&endDate="+endDate,
			data: formData,
			success: function(responseData) {
				var parsedJson = JSON.parse(responseData);
				// Task 5777 START
				if(startDate && endDate){
					parsedJson = LogHistory.filterDataByDateRange(parsedJson,startDate,endDate);
				}
				//Task 5777 END
				if (parsedJson.length <= 0) {
					$(".no-results-found").show();
				}
				else {
					$(".no-results-found").hide();
				}
				for (var i in parsedJson) {
					var aTagView = $("<i></i>").attr("title", "View").attr("fileName", parsedJson[i]["fileName"]).attr("filePath", parsedJson[i]["filePath"]).addClass("anchorClickable fa fa-eye");
					aTagView.on("click", function() {
						var filePath = $(this).attr("filePath");
						var fileName = $(this).attr("fileName");
						$("#Download").unbind("click");
						LogHistory.viewLogs(filePath, fileName);
					});

					var aFeedbackView = $("<i></i>").attr("title", "View").attr("feedbackfile", parsedJson[i]["feedbackfile"]).attr("feedbackpath", parsedJson[i]["feedbackpath"]).addClass("anchorClickable fa fa-eye");
					aFeedbackView.on("click", function() {

						var feedbackpath = $(this).attr("feedbackpath");
						var feedbackfile = $(this).attr("feedbackfile");
						$("#Download").unbind("click");
						LogHistory.viewLogs(feedbackpath, feedbackfile);
					});

					var aTagDownload = $("<i></i>").attr("title", "Download").attr("filePath", parsedJson[i]["filePath"]).addClass("fa fa-download anchorClickable");

					aTagDownload.on("click", function() {
						var filePath = $(this).attr("filePath");
						LogHistory.downloadLogs(filePath);
					});

					var fullFileName = parsedJson[i]["edxFileName"];
					var truncatedText = fullFileName;
					var maxLengthEDXFileName = 35;
					if (useCase == "Design Synchronization") {
						maxLengthEDXFileName = 23;
					}
					if (jQuery.trim(fullFileName).length > maxLengthEDXFileName) {
						truncatedText = jQuery.trim(fullFileName).substring(0, maxLengthEDXFileName) + "...";
					}
					var aedxDownload = $("<a></a>").attr("filePath_edx", parsedJson[i]["filePath_edx"]).attr("title", fullFileName).html(truncatedText).addClass("anchorClickable");
					aedxDownload.on("click", function() {

						var filePath_edx = $(this).attr("filePath_edx");
						LogHistory.downloadLogs(filePath_edx);
					});


					var aFeedbackDownload = $("<i></i>").attr("title", "Download").attr("feedbackpath", parsedJson[i]["feedbackpath"]).addClass("fa fa-download anchorClickable");
					aFeedbackDownload.on("click", function() {
						//alert("feedbackpath", parsedJson[i]["feedbackpath"]);
						var feedbackpath = $(this).attr("feedbackpath");
						LogHistory.downloadLogs(feedbackpath);
					});

			//		$("#userId").html(parsedJson[i]["userId"]);

					var actionTD = $("<td></td>").addClass("min-width-column").append(aTagView).append(aTagDownload);
					var FeedbackactionTD = $("<td></td>").addClass("min-width-column").append(aFeedbackView).append(aFeedbackDownload);
					var formattedDate = parsedJson[i]["createdOn"];
					var createdOnTD = $("<td></td>").addClass("date-column").append(formattedDate);
					var projN = parsedJson[i]["projectName"];
					var truncatedProjectName = projN;
					if (jQuery.trim(projN).length > 22) {
						truncatedProjectName = jQuery.trim(projN).substring(0, 22) + "...";
					}
					var projectNAME = $("<td></td>").attr("title", projN).append(truncatedProjectName);
					var status = $("<td></td>").addClass("min-width-column").append(parsedJson[i]["status"]);
					var edxFileName = $("<td></td>").append(aedxDownload);
					var labelTd = $("<td></td>").append($("<div></div>").attr("title", parsedJson[i]["fileName"]).html(parsedJson[i]["fileName"]).addClass("lableText"));
					
					//Changes for admin UI
			        // Task 5771: 2025xFD01 || Admin UI || For Admin, Add user column
			        // @param String Security Context
			        // Add user column and display logs along with respective user ---> Start
			        // @author sutar.maheshyashwant
			         
					var filePath = parsedJson[i]["filePath"];
					var folderPath = filePath.substring(0, Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\')));
					var folderName = folderPath.split(/[/\\]/).pop();
					securityContext = parsedJson[i]["context"];
					var row;
					if (useCase == "Design Synchronization") {
						edxFileName.addClass("edx-file-name-with-project-name");
						if(securityContext == "VPLMAdmin.Company Name.Default"){
							row = $("<tr></tr>").addClass("project-name").append(projectNAME).append(edxFileName).append(createdOnTD).append(folderName).append(actionTD).append(FeedbackactionTD).append(status);
						}
						else{
							row = $("<tr></tr>").addClass("project-name").append(projectNAME).append(edxFileName).append(createdOnTD).append(actionTD).append(FeedbackactionTD).append(status);
						}
						
					} else if (useCase == "Import Project From 3DEXPERIENCE") {
						if(securityContext == "VPLMAdmin.Company Name.Default"){
							row = $("<tr></tr>").append(edxFileName).append(createdOnTD).append(folderName).append(actionTD).append(status);
						}
						else{
							row = $("<tr></tr>").append(edxFileName).append(createdOnTD).append(actionTD).append(status);
						}
					}
					else {
						edxFileName.addClass("edx-file-name-without-project-name");
						if(securityContext == "VPLMAdmin.Company Name.Default"){
							row = $("<tr></tr>").append(edxFileName).append(createdOnTD).append(folderName).append(actionTD).append(FeedbackactionTD).append(status);
						}
						else{
							row = $("<tr></tr>").append(edxFileName).append(createdOnTD).append(actionTD).append(FeedbackactionTD).append(status);
						}
					}
					//Changes for admin UI
			        // Task 5771: 2025xFD01 || Admin UI || For Admin, Add user column
			        // @param String Security Context
			        // Add user column and display logs along with respective user ---> End
			        // @author sutar.maheshyashwant
					$("#" + divId).append(row);
				}
			},
			error: function(resultData) {
				$(".no-results-found").show();
			}
		})
	},
	// Task 5777 START
	filterDataByDateRange: function(data, startDate, endDate) {

		// Convert startDate and endDate to Date objects
		const start = new Date(startDate);
		const end = new Date(endDate);
		end.setHours(23, 59, 59, 999);
		console.log(start);
		console.log(end);
		// Filter the dataArray based on the createdOn field
		return data.filter(function(item) {
			const itemDate = new Date(item.createdOn); // Convert string to date
			console.log(itemDate);
			return itemDate >= start && itemDate <= end;
		});
  },
  // Task 5777 END
	addDownloadEvent: function() {
		var that = LogHistory;
		$("#Download").on('click', function() {
			var attrFilePath = $(this).attr("filePath");
			LogHistory.downloadLogs(attrFilePath);
			$('#Download').off('click');
			setTimeout(function() {
				that.addDownloadEvent();
			}, 1000);
		});
	},

	viewLogs: function(filePath, fileName) {
		var that = LogHistory;
		filePath = encodeURI(filePath);
		var formData = {
			'logFilePath': filePath
		};
		$("#Download").attr("filePath", filePath)
		that.addDownloadEvent();
		$.ajax({
			method: "GET",
			async: false,
			url: solutionContext + "/livelogs",
			data: formData,
			success: function(resultData) {
				var lines = resultData.split('</br>');
				var Altered_data = "";
				for (var line = 0; line < lines.length; line++) {

					if (fileName.endsWith("Feedback.csv")) {
						const myArray = lines[line].split(",");
						if (line == 0) {

							Altered_data = Altered_data + "<table class='table table-hover' > <tr>";
							for (var i = 0; i < myArray.length; i++) {
								Altered_data = Altered_data + "<th>" + myArray[i] + "</th>";
							}
							Altered_data = Altered_data + "</tr>";
						} else if (line == (lines.length - 1)) {
							Altered_data = Altered_data + "<tr>";
							for (var i = 0; i < myArray.length; i++) {
								Altered_data = Altered_data + "<td>" + myArray[i] + "</td>";
							}
							Altered_data = Altered_data + "</tr></table>";
						} else {
							Altered_data = Altered_data + "<tr>";
							for (var i = 0; i < myArray.length; i++) {
								Altered_data = Altered_data + "<td>" + myArray[i] + "</td>";
							}
							Altered_data = Altered_data + "</tr>";
						}

					} else {
						var ll = lines[line];
						ll = ll.replaceAll("##End##", "");
						if (ll.startsWith("NOTE")) {
							ll = ll.replaceAll("NOTE | ", "");
							Altered_data = Altered_data + "<p>  <span style='color:#34ebd8'>" + ll + "</span> </p>";
						} else if (ll.startsWith("ERROR")) {
							ll = ll.replaceAll("ERROR | ", "");
							Altered_data = Altered_data + "<p>  <span style='color:red'>" + ll + "</span> </p>";
						}
						else {
							Altered_data = Altered_data + ll + " </br>";
						}
					}
				}
				$("#myModal").show();
				$(".modalheading").html(fileName);
				if (Altered_data.length > 1) {
					$("#contentModel").html(Altered_data);
				} else {
					$("#contentModel").html("No Data Found");
				}
			},
			error: function(resultData) {
				console.log(resultData);
			}
		});
	},
	downloadLogs: function(filePath) {
		filePath = encodeURI(filePath);
		DownLoadFile.download(filePath);
	},
	sort: function(tableID, columnNumber) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = $("#" + tableID)[0];
		switching = true;
		dir = "asc";
		while (switching) {
			switching = false;
			rows = table.rows;
			for (i = 1; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName("TD")[columnNumber];
				y = rows[i + 1].getElementsByTagName("TD")[columnNumber];
				if (dir == "asc") {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount == 0 && dir == "asc") {
					dir = "desc";
					switching = true;
				}
			}
		}
	}
}