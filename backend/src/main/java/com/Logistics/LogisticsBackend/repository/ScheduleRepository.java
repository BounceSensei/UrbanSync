package com.Logistics.LogisticsBackend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Logistics.LogisticsBackend.model.Schedule;
import com.Logistics.LogisticsBackend.payload.response.ScheduleResponse;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query("SELECT s FROM Schedule s WHERE s.driver.id = :driverId AND s.id <> :scheduleId AND s.departureDateTime < :end AND s.estimatedArrivalDateTime > :start")
    List<Schedule> findOverlappingSchedulesForDriver(@Param("driverId") Long driverId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end, @Param("scheduleId") Long scheduleId);

    @Query("SELECT s FROM Schedule s WHERE s.bus.id = :busId AND s.id <> :scheduleId AND s.departureDateTime < :end AND s.estimatedArrivalDateTime > :start")
    List<Schedule> findOverlappingSchedulesForBus(@Param("busId") Long busId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end, @Param("scheduleId") Long scheduleId);

    List<Schedule> findByRouteIdAndDepartureDateTimeBetween(Long routeId, LocalDateTime start, LocalDateTime end);

    // Projection to safely fetch schedule scalar data using LEFT JOINs to avoid EntityNotFound exceptions
    @org.springframework.data.jpa.repository.Query("SELECT new com.Logistics.LogisticsBackend.payload.response.ScheduleResponse(s.id, d.id, b.id, r.id, s.departureDateTime, s.estimatedArrivalDateTime, s.status) FROM Schedule s LEFT JOIN s.driver d LEFT JOIN s.bus b LEFT JOIN s.route r")
    List<ScheduleResponse> findAllAsDto();
}