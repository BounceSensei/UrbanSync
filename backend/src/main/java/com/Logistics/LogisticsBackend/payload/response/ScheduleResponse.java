package com.Logistics.LogisticsBackend.payload.response;

import java.time.LocalDateTime;

public class ScheduleResponse {
    private Long id;
    private Long driverId;
    private Long busId;
    private Long routeId;
    private LocalDateTime departureDateTime;
    private LocalDateTime estimatedArrivalDateTime;
    private String status;

    public ScheduleResponse(Long id, Long driverId, Long busId, Long routeId, LocalDateTime departureDateTime, LocalDateTime estimatedArrivalDateTime, String status) {
        this.id = id;
        this.driverId = driverId;
        this.busId = busId;
        this.routeId = routeId;
        this.departureDateTime = departureDateTime;
        this.estimatedArrivalDateTime = estimatedArrivalDateTime;
        this.status = status;
    }

    public Long getId() { return id; }
    public Long getDriverId() { return driverId; }
    public Long getBusId() { return busId; }
    public Long getRouteId() { return routeId; }
    public LocalDateTime getDepartureDateTime() { return departureDateTime; }
    public LocalDateTime getEstimatedArrivalDateTime() { return estimatedArrivalDateTime; }
    public String getStatus() { return status; }
}
