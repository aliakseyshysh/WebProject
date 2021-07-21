<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<link href="<c:url value="${CSS_COMMENT}"/>" rel="stylesheet">
<div class="col-md-4">
	<div class="content-section">
		<h3>${TEXT[PAGE_HOME_ALIENBAR]}</h3>
		<p class='text-muted'>${TEXT[PAGE_HOME_CONTACT_ADMIN]}
		<ul class="list-group">
			<li class="list-group-item list-group-item-light">${TEXT[PAGE_HOME_ADMIN_EMAIL]}</li>
			<li class="list-group-item list-group-item-light">${TEXT[PAGE_HOME_YEAR]}</li>
		</ul>
		</p>
	</div>
</div>