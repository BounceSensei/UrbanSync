package com.Logistics.LogisticsBackend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.Logistics.LogisticsBackend.payload.response.MessageResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<MessageResponse> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        MessageResponse messageResponse = new MessageResponse(ex.getMessage());
        return new ResponseEntity<>(messageResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<MessageResponse> handleDuplicateResourceException(DuplicateResourceException ex, WebRequest request) {
        MessageResponse messageResponse = new MessageResponse(ex.getMessage());
        return new ResponseEntity<>(messageResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<MessageResponse> handleIllegalArgument(IllegalArgumentException ex, WebRequest request) {
        MessageResponse messageResponse = new MessageResponse(ex.getMessage());
        return new ResponseEntity<>(messageResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageResponse> handleAllExceptions(Exception ex, WebRequest request) {
        // Log exception server-side; don't expose details to clients
        logger.error("Unhandled exception caught by GlobalExceptionHandler", ex);
        MessageResponse messageResponse = new MessageResponse("Internal Server Error");
        return new ResponseEntity<>(messageResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}