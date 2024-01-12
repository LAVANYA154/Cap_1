// RegisterRepository.java

package com.example.demo.repository;

import com.example.demo.model.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterRepository extends JpaRepository<Register, String> {

    // You can add custom query methods here if needed
	@Query("FROM Register WHERE email=:email")
	Register findUser(@Param("email")String email);

}
