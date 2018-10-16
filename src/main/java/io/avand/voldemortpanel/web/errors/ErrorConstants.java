package io.avand.voldemortpanel.web.errors;

import java.net.URI;

public final class ErrorConstants {

    public static final String ERR_VALIDATION = "اطلاعات وارد شده صحیح نمی‌باشد";
    public static final URI DEFAULT_TYPE = URI.create("problem-with-message");
    public static final URI CONSTRAINT_VIOLATION_TYPE = URI.create("contraint-violation");
    public static final URI PARAMETERIZED_TYPE = URI.create("parameterized");



    private ErrorConstants() {
    }

}
