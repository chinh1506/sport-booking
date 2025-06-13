package com.example.booking.service.implement;

import com.example.booking.entity.Complex;
import com.example.booking.repository.ComplexRepository;
import com.example.booking.service.ComplexService;
import com.example.booking.util.filterparam.PageAndFilterParam;
import com.example.booking.util.filterparam.SortOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ComplexServiceImpl implements ComplexService {
    private final ComplexRepository complexRepository;

    public ComplexServiceImpl(ComplexRepository complexRepository) {
        this.complexRepository = complexRepository;
    }

    @Override
    public Page<Complex> findAll(PageAndFilterParam param) {
        Sort sort = Sort.by(param.getOrderBy()).ascending();
        if (param.getOrder() == SortOrder.DESCENDING) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(param.getPage(), param.getLimit(), sort);

        return this.complexRepository.findAll(pageable);
    }
}
