package com.example.booking.config.generator;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.sql.Statement;

public class GenerateID implements IdentifierGenerator {

    @Override
    public Object generate(SharedSessionContractImplementor session, Object o) {
        String query = "SELECT MAX(substring(id, 2)) as max_value FROM User ";
        Serializable maxId = (Serializable) session.createQuery(query).uniqueResult();

        String prefix = o.getClass().getSimpleName().substring(0,1);
        long idVal = 0;
        if (maxId != null) {
            idVal = Long.parseLong(maxId.toString());
        }

        return prefix + String.format("%03d", idVal + 1);
    }
}
