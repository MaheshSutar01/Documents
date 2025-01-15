<%@page import="java.io.FileInputStream"%>
<%@page import="java.util.Properties"%>
<%@page import="com.hcl.edmconnector.configurations.ApplicationConfiguration"%>
<%@page import="javax.ws.rs.core.Application"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.InputStream, java.util.Properties" %>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript"
	src="${solutionContext}/js/project-selection.js"></script>
<link href="${solutionContext}/css/top-navigation.css" rel="stylesheet"
	type="text/css">
<link href="${solutionContext}/css/bundle.css" rel="stylesheet"
	type="text/css">
<%-- <script type="text/javascript" src="${solutionContext}/js/basil.min.js"></script>
<script type="text/javascript"
	src="${solutionContext}/js/session-timeout.js"></script> --%>
</head>
<body>
	<!-- new code start-->
	<div id="topbar" class="topbar">
		<div class="topbar-logo"></div>
		<div id="compass_ctn" class="topbar-compass compass-v3">
			<div class="compass-ct">
				<div class="compass-small" title="">
					<div class="compass-small-over"></div>
					<div class="quadrant-play-small"></div>
				</div>
				<div class="compass-base">
					<div class="compass-over"></div>
					<div class="compass-on"></div>
					<div class="quadrant-play"></div>
				</div>
			</div>
		</div>
		<div class="topbar-left">
			<div class="topbar-app">
				<span class="topbar-app-i3dx"><b>3D</b>EXPERIENCE |</span> <span
					class="topbar-app-brand ">EDM Connector</span>
			</div>
		</div>
		
		<div class="topbar-right topbar-without-extrabtn ">
			<div class="topbar-cmd fonticon fonticon-menu menu" title=""></div>
			<div class="topbar-menu">
				<div class="topbar-user d-flex flex-row">
					<div
						class="d-flex flex-column full-width topbar-user-context-username-text">
						<div id="userId" class="font-3dslight topbar-username">${userId}</div>
						<div class="topbar-user-context-wrapper hide">
							<span class="font-3dsregular topbar-user-context-text"></span>
						</div>
					</div>
				</div>
				<div class="topbar-user d-flex flex-row">
					<div
						class="d-flex flex-column full-width topbar-user-context-username-text">
						<div class="font-3dslight topbar-username logout clickable">Logout</div>
						<div class="topbar-user-context-wrapper hide">
							<span class="font-3dsregular topbar-user-context-text"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="topbar-extrabtn topbar-extrabtn-hidden">
			<div class="topbar-extrabtn-divider">|</div>
			<div class="topbar-cmd extrabtn" title=""></div>
		</div>
	</div>



	<div id="mySidenav" class="sidenav"
		style="display: block; width: 22.4%; min-height: 80%; height: 587px; border-right: 1px solid #ccc;">
		<!-- <a tabindex="1" class="import-project import" href="#">Create
			Project From 3DEXPERIENCE</a>  -->
			<a tabindex="1"
			class="create-new-project create import admin" id="createXpdAdmin" href="#" style="pointer-events:none; color:#C0C0C0;">Create Xpedition EDM Project</a>
			<a tabindex="2"
			class="create-new-project create import" id="createXpeditionProject" href="#">Create Xpedition EDM Project</a>
			<a tabindex="3" class="diagnostics-tab diagnostics" id = "diagnosticsTab" href="#">Diagnostics</a>

		<a tabindex="4" class="log-history-title log-history" href="#">Log
			History</a> <a tabindex="5" class="system-configuration system-configuration" id="systemConfigTab"
			href="#">System Configuration</a>
		<a tabindex="6" class="users-utility users-utility" id="userUtilityTab"
			href="#">Users Utility</a>	
	</div>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js?v=1"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			var context = "${securityContext}"; 
			// Check if context matches the desired string and hide/show the tab accordingly
			if (context == "VPLMAdmin.Company Name.Default") {
				$("#createXpeditionProject").hide();
				$("#createXpdAdmin").show();
				$("#systemConfigTab").show();
				$("#diagnosticsTab").show();
			} else {
				$("#createXpdAdmin").hide();
				$("#systemConfigTab").hide();
				$("#diagnosticsTab").hide();
			}
		});
	</script>
	<script type="text/javascript">
		if ("${activeTab}" !== "") {
			$(".${activeTab}").addClass("activeTab");
		}
		if ("${activeTab}" === "log-history") {
			$("#myInput").show();
		}
		if ("${activeTab}" === "system-configuration") {
			$("#reset-button").show();
		}
		$(".logout").on('click', function() {
			window.open(solutionContext + "/logout", "_self");
		});
		 $(".create-new-project").on('click', function() {
			window.open(solutionContext + "/create", "_self");
		});
		/* $(".import-project").on('click', function() {
			window.open(solutionContext + "/import", "_self");
		});  */
		$(".log-history-title").on('click', function() {
			window.open(solutionContext + "/loghistory", "_self");
		});
		$(".home").on('click', function() {
			window.open(solutionContext + "/homepage", "_self");
		});
		$(".diagnostics-tab").on('click', function() {
				window.open(solutionContext + "/diagnostics", "_self");
		});
		$(".system-configuration").on('click', function() {
			window.open(solutionContext + "/system-configuration", "_self");
		});
		$(".users-utility").on('click', function() {
		    window.open(solutionContext + "/users_utility", "_self");
		});
		/*$(document).ready(function($) {
			function start_timer() {
				$.jq_easy_session_timeout({
					inactivityDialogDuration : 1 * 60,
					maxInactivitySeconds : 2 * 60,
					inactivityLogoutUrl : function() {
						window.open(solutionContext + "/logout", "_self");
					},
				});
			}
			start_timer();
		});*/
	</script>
</body>
</html>