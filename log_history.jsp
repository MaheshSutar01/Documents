<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>EDM Connector : Log History</title>
<link rel="icon" type="image/png" sizes="32x32"
	href="${solutionContext}/images/favicon.ico">
<link href="${solutionContext}/css/bootstrap.min.css" rel="stylesheet"
	type="text/css">
<link href="${solutionContext}/css/style.css" rel="stylesheet"
	type="text/css">
	
<link
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
	rel="stylesheet" type="text/css" />
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">
<link rel="stylesheet" type="text/css"
	href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
<script type="text/javascript" src="${solutionContext}/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${solutionContext}/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="${solutionContext}/js/design-sync-events.js"></script>
<script type="text/javascript" src="${solutionContext}/js/global.js"></script>
<script type="text/javascript"
	src="${solutionContext}/js/download-file.js"></script>
<script type="text/javascript"
	src="${solutionContext}/js/log-history.js"></script>
<script type="text/javascript" src="${solutionContext}/js/moment.min.js"></script>
<link href="${solutionContext}/css/user-confirmation.css"
	rel="stylesheet" type="text/css">
<link href="${solutionContext}/css/log-history.css" rel="stylesheet"
	type="text/css">
<link href="${solutionContext}/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
html {
	overflow: hidden !important;
}
label {
	margin-left: 5px;
}
</style>
</head>
<body>
	<div>
		<%@ include file="./top_navigation.jsp"%>
	</div>
	<div class="-wrapper">
		<ul class="nav nav-tabs nav-tabs-sys-config">
			<li class="wp-tab wp-drop navigation-list LIBRARY_FROM_EDM_TAB">
				<div class="inner-ctn">
					<span tabindex="6" class="title" id="LIBRARY_FROM_EDM_TAB">Library
						Synch From Xpedition </span>
					<div class="underline-tab-el"></div>
				</div>
			</li>
			<li class="wp-tab wp-drop navigation-list LIBRARY_FROM_3DEX_TAB">
				<div class="inner-ctn">
					<span tabindex="7" class="title" id="LIBRARY_FROM_3DEX_TAB">Library
						Synch From 3DEXPERIENCE</span>
					<div class="underline-tab-el"></div>
				</div>
			</li>
			<li class="wp-tab wp-drop navigation-list DESIGN_SYNCH_TAB">
				<div class="inner-ctn">
					<span tabindex="8" class="title" id="DESIGN_SYNCH_TAB">Design
						Synch</span>
					<div class="underline-tab-el"></div>
				</div>
			</li>
			<li class="wp-tab wp-drop navigation-list CLONE_TAB">
				<div class="inner-ctn">
					<span tabindex="9" class="title" id="CLONE_TAB">Create
						Project From 3DEXPERIENCE</span>
					<div class="underline-tab-el"></div>
				</div>
			</li>
		</ul>
		<!-- <form class = "consolidate-Report" id = "consolidate-Report">		
			<label>Select Range: </label> <input type="text" id="dateRangePicker" name="daterange" />
		 	<button id="submitBtn" class "btnbtn-primary">log logs</button>
			<a class="consolidate-Report-download" title="consolidate-Report">Failure-Report</a>
		</form>  --> 
	</div>

	<div class="mySearchBox">
		
		
		<form class = "consolidate-Report" id = "consolidate-Report">	
		<input class="myInput"
				class="sn-search-field uwa-autocomplete nv-autocomplete-input"
				placeholder="Search Logs" autocomplete="off" type="text"
				maxlength="500">	
			<label>Select Range: </label> <input type="text" id="dateRangePicker" class="datePicker" name="daterange" />
			<a class="consolidate-Report-download" title="consolidate-Report">Failure-Report</a>
		</form>
	</div>
	
	<div id="EDM" class="tabcontent" style='top: 175px'>
		<table class="table table-hover" id="LIBRARY_FROM_EDM"
			style='top: 175px'>
			<tbody id="myTable1" class="myTabClass">
				<tr class="danger">
					<th class="edx-file-name-without-project-name">EDX File Name <i
						title="Sort" column="0" parentId="LIBRARY_FROM_EDM"
						class="fa fa-fw fa-sort"></i></th>
					<th class="date-column">Synch Date <i title="Sort" column="1"
						parentId="LIBRARY_FROM_EDM" class="fa fa-fw fa-sort"></i></th>
					<th class="min-width-column" id="userEDM">User</th>
					<th class="min-width-column">Logs</th>
					<th class="min-width-column">Summary</th>
					<th class="min-width-column">Status<i title="Sort" column="4"
						parentId="LIBRARY_FROM_EDM" class="fa fa-fw fa-sort"></i></th>
				</tr>
			</tbody>
		</table>
		<div class="no-results-found" style="display: none;">No results
			found!</div>
	</div>
	<div id="3DEX" class="tabcontent" style='top: 175px'>
	
		<table class="table table-hover" id="LIBRARY_FROM_3DEX"
			style='top: 175px'>
			<tbody id="myTable2" class="myTabClass">
				<tr class="danger">
					<th class="edx-file-name-without-project-name">EDX File Name <i
						title="Sort" column="0" parentId="LIBRARY_FROM_3DEX"
						class="fa fa-fw fa-sort"></i></th>
					<th class="date-column">Synch Date <i title="Sort" column="1"
						parentId="LIBRARY_FROM_3DEX" class="fa fa-fw fa-sort"></i></th>
					<th class="min-width-column" id="user3DEX">User</th>
					<th class="min-width-column">Logs</th>
					<th class="min-width-column">Summary</th>
					<th class="min-width-column">Status<i title="Sort" column="4"
						parentId="LIBRARY_FROM_3DEX" class="fa fa-fw fa-sort"></i></th>
				</tr>
			</tbody>
		</table>
		<div class="no-results-found" style="display: none;">No results
			found!</div>

	</div>
	<div id="DESIGN" class="tabcontent" style='top: 175px'>
	
		<table class="table table-hover" id="DESIGN_SYNCH" style='top: 175px'>

			<tbody id="myTable3" class="myTabClass">
				<tr class="danger">
					<th class="project-name">Project <i title="Sort" column="0"
						parentId="DESIGN_SYNCH" class="fa fa-fw fa-sort"></i></th>
					<th class="edx-file-name-with-project-name">EDX File Name <i
						title="Sort" column="1" parentId="DESIGN_SYNCH"
						class="fa fa-fw fa-sort"></i></th>
					<th class="date-column">Synch Date <i title="Sort" column="2"
						parentId="DESIGN_SYNCH" class="fa fa-fw fa-sort"></i></th>
					<th class="min-width-column" id="userDesign">User</th>
					<th class="min-width-column">Logs</th>
					<th class="min-width-column">Summary</th>
					<th class="min-width-column">Status<i title="Sort" column="5"
						parentId="DESIGN_SYNCH" class="fa fa-fw fa-sort"></i></th>
				</tr>
			</tbody>
		</table>
		<div class="no-results-found" style="display: none;">No results
			found!</div>
	</div>
	<div id="CLONE" class="tabcontent" style='top: 175px'>
	
		<table class="table table-hover" id="CLONE_PLM" style='top: 175px'>
			<tbody id="myTable4" class="myTabClass">
				<tr class="danger">
					<th class="edx-file-name-without-project-name">EDX File Name <i
						title="Sort" column="0" parentId="CLONE_PLM"
						class="fa fa-fw fa-sort"></i></th>
					<th class="date-column">Synch Date <i title="Sort" column="1"
						parentId="CLONE_PLM" class="fa fa-fw fa-sort"></i></th>
					<th class="min-width-column" id="userClone">User</th>
					<th class="min-width-column">Logs</th>
					<th class="min-width-column">Status<i title="Sort" column="3"
						parentId="CLONE_PLM" class="fa fa-fw fa-sort"></i></th>
				</tr>
			</tbody>
		</table>
		<div class="no-results-found" style="display: none;">No results
			found!</div>
	</div>
	<div id="myModal" class="modal">
		<div class="modal-content">
			<div class="topbarModal">
				<span class="close">&times;</span>
				<div class="modalheading"></div>
			</div>
			<div id="contentModel"></div>
			<div class="modal-buttons-select">
				<input type="reset" value="Close" class="buttonBottom btn-default"
					name="Close" id="cancel"> <input type="submit"
					value="Download" class="buttonBottom btn-default" name="Download"
					id="Download">
			</div>
		</div>
	</div>
	<script>
		events();
		setContext('${solutionContext}');
		LogHistory.build();
		setUserId('${userId}');
		$(document).ready(function() {
			var context = "${securityContext}"; 
			// Check if context matches the desired string and hide/show the tab accordingly
			if (context == "VPLMAdmin.Company Name.Default") {
				$("#userEDM").show();
				$("#user3DEX").show();
				$("#userDesign").show();
				$("#userClone").show();
			} else {
				$("#userEDM").hide();
				$("#user3DEX").hide();
				$("#userDesign").hide();
				$("#userClone").hide();
			}
		});
	</script>

	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>

	<script>
		$(function() {
			$('input[name="daterange"]').daterangepicker(
					{
						opens : 'left'
					},
					function(start, end, label) {
						console.log("A new date selection was made: "
								+ start.format('YYYY-MM-DD') + ' to '
								+ end.format('YYYY-MM-DD'));
					});
		});
	</script>

	<script>
		document
				.addEventListener(
						"DOMContentLoaded",
						function() {
							function updateMarginTop() {
								const zoomLevel = Math
										.round(window.devicePixelRatio * 100); 
								let marginTop;

								if (zoomLevel > 100) {
									marginTop = 4 + ((zoomLevel - 100) / 10) * 0.1;
								} else if (zoomLevel < 100) {
									marginTop = 4 - ((100 - zoomLevel) / 10) * 0.1;
								} else {
									marginTop = 4; 
								}
								const mySearchBox = document
										.getElementsByClassName("mySearchBox")[0];
								if (mySearchBox) {
									mySearchBox.style.marginTop = marginTop
											+ "%";
								} else {
									console
											.error("Element with class 'mySearchBox' not found.");
								}
							}

							updateMarginTop();

							window.addEventListener("resize", updateMarginTop);
						});
	</script>
</body>
</html>