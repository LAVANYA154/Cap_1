package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.model.requestSoftware;
import java.time.LocalDate;


@Repository
public interface requestRepository extends JpaRepository<requestSoftware, Long> {
	List<requestSoftware> findByUsername(String username);
	
    boolean existsByUsernameAndId(String username, Long id);
    
    List<requestSoftware> findByExpiryDate(LocalDate expiryDate);
    
    
	requestSoftware findByIdAndUsername(Long id, String username);

	@Query(value="SELECT name,COUNT(name) FROM request_software WHERE status = 1 GROUP BY name",nativeQuery=true)
	List<Object[]> softwareCount();
	
	@Query(value="select * from request_software where status=1",nativeQuery=true)
	List<requestSoftware> findActivatedUser();
	
	@Query(value="select count(username) from request_software where status=1",nativeQuery=true)
	int findActivatedUserCount();
	
	@Query(value="select count(username) from request_software where status=0",nativeQuery=true)
	int findUnActivatedUserCount();
	
}
