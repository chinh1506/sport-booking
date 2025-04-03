package com.example.booking.exception;

import com.example.booking.util.RestResponse;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestResponse<Object>> validationError(MethodArgumentNotValidException ex) {
        System.out.println("Ex handle");
        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();

        List<String> errors = fieldErrors.stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());

        RestResponse<Object> response = new RestResponse<>();
        response.setStatus("Error");
        response.setError(ex.getBody().getDetail());
        response.setStatusCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage(errors.size() > 1 ? errors : errors.get(0));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }

    @ExceptionHandler(value = {UsernameNotFoundException.class, BadCredentialsException.class})
    public ResponseEntity<RestResponse<Object>> handleLoginException(Exception ex) {
        System.out.println("Ex UsernameNotFoundException BadCredentialsException");

        RestResponse<Object> response = new RestResponse<Object>();
        response.setStatus("Error");
        response.setError(ex.getMessage());
        response.setStatusCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage(ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<RestResponse<Object>> handleFeignException(FeignException ex) {
        System.out.println("Ex handleFeignException");
        ex.printStackTrace();
        RestResponse<Object> response = RestResponse.builder().status("Error").build();

        response.setError(ex.getMessage());
        response.setStatusCode(ex.status());
        response.setMessage(ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<RestResponse<Object>> handleCommonException(Exception ex) {
            log.error("Exception: {}", ex);
        System.out.println("Ex common");
//    ex.printStackTrace();
        RestResponse<Object> response = new RestResponse<Object>();
        response.setStatus("Unknown");
        response.setError(ex.getMessage());
        response.setStatusCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage(ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }
}
