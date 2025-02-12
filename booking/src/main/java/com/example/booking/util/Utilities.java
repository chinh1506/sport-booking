package com.example.booking.util;

import lombok.experimental.UtilityClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@UtilityClass
public class Utilities {

    public String generateID() {
        return UUID.randomUUID().toString().replaceAll("-","");
    }
    public String generateID(String prefix) {
        return prefix + UUID.randomUUID().toString().replaceAll("-","");
    }

}
