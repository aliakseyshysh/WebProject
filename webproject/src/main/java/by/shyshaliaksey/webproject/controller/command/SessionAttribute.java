package by.shyshaliaksey.webproject.controller.command;

public enum SessionAttribute {

	CONTROLLER("controller"),
	ERROR_INFO("error_info"),
	PROJECT_NAME("webproject");
	
	private String value;
	
	private SessionAttribute(String value) {
		this.value = value;
	}
	
	public String getValue() {
		return value;
	}
	
}
