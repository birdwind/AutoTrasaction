package com.birdwind.autoTransaction.entity.dao;

import com.birdwind.autoTransaction.base.repo.BaseRepository;
import com.birdwind.autoTransaction.entity.model.Function;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface FunctionDao extends BaseRepository<Function, Integer> {

    @Query("SELECT mfr.function FROM ModuleFunctionRelate mfr WHERE mfr.module.moduleId = ?1")
    Optional<List<Function>> findAllFunctionsByModuleId(Integer moduleId);

    @Query("SELECT mfr.function FROM ModuleFunctionRelate mfr WHERE mfr.function.status = true "
        + "AND mfr.module.moduleId = ?1")
    Optional<List<Function>> findFunctionsByModuleId(Integer moduleId);

}
