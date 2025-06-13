package com.example.booking.service;

import com.example.booking.entity.Complex;
import com.example.booking.util.filterparam.PageAndFilterParam;
import org.springframework.data.domain.Page;

public interface ComplexService {
    Page<Complex> findAll(PageAndFilterParam param);

}
