package com.softserve.service;

import com.softserve.dto.RoomTypeDTO;
import com.softserve.entity.RoomType;
import com.softserve.exception.EntityNotFoundException;
import com.softserve.exception.FieldAlreadyExistsException;
import com.softserve.mapper.RoomTypeMapper;
import com.softserve.repository.RoomTypeRepository;
import com.softserve.service.impl.RoomTypeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@Tag("unit")
@ExtendWith(MockitoExtension.class)
class RoomTypeServiceTest {

    @Mock
    private RoomTypeRepository roomTypeRepository;

    @Mock
    private RoomTypeMapper roomTypeMapper;

    @InjectMocks
    private RoomTypeServiceImpl roomTypeService;

    private RoomType roomType;
    private RoomTypeDTO roomTypeDTO;

    @BeforeEach
    void setUp() {
        roomType = new RoomType();
        roomType.setId(1L);
        roomType.setDescription("Lecture Hall");

        roomTypeDTO = new RoomTypeDTO();
        roomTypeDTO.setId(1L);
        roomTypeDTO.setDescription("Lecture Hall");
    }

    @Test
    void getRoomTypeById() {
        when(roomTypeRepository.findById(1L)).thenReturn(Optional.of(roomType));
        when(roomTypeMapper.roomTypeToRoomTypeDTO(roomType)).thenReturn(roomTypeDTO);

        RoomTypeDTO result = roomTypeService.getById(1L);

        assertNotNull(result);
        assertEquals(roomTypeDTO.getId(), result.getId());
        assertEquals(roomTypeDTO.getDescription(), result.getDescription());
        verify(roomTypeRepository, times(1)).findById(1L);
        verify(roomTypeMapper, times(1)).roomTypeToRoomTypeDTO(roomType);
    }

    @Test
    void throwEntityNotFoundExceptionIfRoomTypeNotExists() {
        when(roomTypeRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> roomTypeService.getById(2L));

        verify(roomTypeRepository, times(1)).findById(2L);
    }

    @Test
    void getAllRoomTypes() {
        List<RoomType> roomTypes = List.of(roomType);
        List<RoomTypeDTO> roomTypeDTOs = List.of(roomTypeDTO);

        when(roomTypeRepository.getAll()).thenReturn(roomTypes);
        when(roomTypeMapper.roomTypesToRoomTypeDTOs(roomTypes)).thenReturn(roomTypeDTOs);

        List<RoomTypeDTO> result = roomTypeService.getAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(roomTypeRepository, times(1)).getAll();
        verify(roomTypeMapper, times(1)).roomTypesToRoomTypeDTOs(roomTypes);
    }

    @Test
    void saveRoomTypeIfDescriptionDoesNotExists() {
        RoomTypeDTO inputDTO = new RoomTypeDTO();
        inputDTO.setDescription("Lecture Hall");

        when(roomTypeRepository.countRoomTypesWithDescription("Lecture Hall")).thenReturn(0L);
        when(roomTypeMapper.roomTypeDTOTRoomType(inputDTO)).thenReturn(roomType);
        when(roomTypeRepository.save(roomType)).thenReturn(roomType);
        when(roomTypeMapper.roomTypeToRoomTypeDTO(roomType)).thenReturn(roomTypeDTO);

        RoomTypeDTO result = roomTypeService.save(inputDTO);

        assertNotNull(result);
        assertEquals(roomTypeDTO.getDescription(), result.getDescription());
        verify(roomTypeRepository, times(1)).countRoomTypesWithDescription("Lecture Hall");
        verify(roomTypeMapper, times(1)).roomTypeDTOTRoomType(inputDTO);
        verify(roomTypeRepository, times(1)).save(roomType);
        verify(roomTypeMapper, times(1)).roomTypeToRoomTypeDTO(roomType);
    }

    @Test
    void throwFieldAlreadyExistsExceptionIfSavedDescriptionAlreadyExists() {
        RoomTypeDTO inputDTO = new RoomTypeDTO();
        inputDTO.setDescription("Lecture Hall");

        when(roomTypeRepository.countRoomTypesWithDescription("Lecture Hall")).thenReturn(1L);

        assertThrows(FieldAlreadyExistsException.class, () -> roomTypeService.save(inputDTO));

        verify(roomTypeRepository, times(1)).countRoomTypesWithDescription("Lecture Hall");
        verify(roomTypeRepository, never()).save(any(RoomType.class));
    }

    @Test
    void updateRoomTypeIfDescriptionDoesNotExists() {
        RoomTypeDTO inputDTO = new RoomTypeDTO();
        inputDTO.setId(1L);
        inputDTO.setDescription("Updated Room Type");

        RoomType updatedRoomType = new RoomType();
        updatedRoomType.setId(1L);
        updatedRoomType.setDescription("Updated Room Type");

        RoomTypeDTO resultDTO = new RoomTypeDTO();
        resultDTO.setId(1L);
        resultDTO.setDescription("Updated Room Type");

        when(roomTypeRepository.countByRoomTypeId(1L)).thenReturn(1L);
        when(roomTypeRepository.countRoomTypesWithDescriptionAndIgnoreId(1L, "Updated Room Type")).thenReturn(0L);
        when(roomTypeMapper.roomTypeDTOTRoomType(inputDTO)).thenReturn(updatedRoomType);
        when(roomTypeRepository.update(updatedRoomType)).thenReturn(updatedRoomType);
        when(roomTypeMapper.roomTypeToRoomTypeDTO(updatedRoomType)).thenReturn(resultDTO);

        RoomTypeDTO result = roomTypeService.update(inputDTO);

        assertNotNull(result);
        assertEquals(resultDTO.getDescription(), result.getDescription());
        verify(roomTypeRepository, times(1)).countByRoomTypeId(1L);
        verify(roomTypeRepository, times(1)).countRoomTypesWithDescriptionAndIgnoreId(1L, "Updated Room Type");
        verify(roomTypeMapper, times(1)).roomTypeDTOTRoomType(inputDTO);
        verify(roomTypeRepository, times(1)).update(updatedRoomType);
        verify(roomTypeMapper, times(1)).roomTypeToRoomTypeDTO(updatedRoomType);
    }

    @Test
    void throwFieldAlreadyExistsExceptionIfUpdatedDescriptionAlreadyExists() {
        RoomTypeDTO inputDTO = new RoomTypeDTO();
        inputDTO.setId(1L);
        inputDTO.setDescription("Existing Description");

        when(roomTypeRepository.countByRoomTypeId(1L)).thenReturn(1L);
        when(roomTypeRepository.countRoomTypesWithDescriptionAndIgnoreId(1L, "Existing Description")).thenReturn(1L);

        assertThrows(FieldAlreadyExistsException.class, () -> roomTypeService.update(inputDTO));

        verify(roomTypeRepository, times(1)).countByRoomTypeId(1L);
        verify(roomTypeRepository, times(1)).countRoomTypesWithDescriptionAndIgnoreId(1L, "Existing Description");
        verify(roomTypeRepository, never()).update(any(RoomType.class));
    }

    @Test
    void throwEntityNotFoundExceptionWhenUpdateRoomTypeNotFound() {
        RoomTypeDTO inputDTO = new RoomTypeDTO();
        inputDTO.setId(1L);
        inputDTO.setDescription("Some Description");

        when(roomTypeRepository.countByRoomTypeId(1L)).thenReturn(0L);

        assertThrows(EntityNotFoundException.class, () -> roomTypeService.update(inputDTO));

        verify(roomTypeRepository, times(1)).countByRoomTypeId(1L);
        verify(roomTypeRepository, never()).update(any(RoomType.class));
    }

    @Test
    void deleteById() {
        when(roomTypeRepository.findById(1L)).thenReturn(Optional.of(roomType));
        when(roomTypeRepository.delete(roomType)).thenReturn(roomType);

        roomTypeService.deleteById(1L);

        verify(roomTypeRepository, times(1)).findById(1L);
        verify(roomTypeRepository, times(1)).delete(roomType);
    }

    @Test
    void throwEntityNotFoundExceptionWhenDeleteRoomTypeNotFound() {
        when(roomTypeRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> roomTypeService.deleteById(1L));

        verify(roomTypeRepository, times(1)).findById(1L);
        verify(roomTypeRepository, never()).delete(any(RoomType.class));
    }

    // Additional tests for edge cases and negative scenarios
    @Test
    void getAllRoomTypesWithEmptyResult() {
        // Arrange
        List<RoomType> emptyRoomTypes = List.of();
        List<RoomTypeDTO> emptyRoomTypeDTOs = List.of();

        when(roomTypeRepository.getAll()).thenReturn(emptyRoomTypes);
        when(roomTypeMapper.roomTypesToRoomTypeDTOs(emptyRoomTypes)).thenReturn(emptyRoomTypeDTOs);

        // Act
        List<RoomTypeDTO> result = roomTypeService.getAll();

        // Assert
        assertNotNull(result);
        assertEquals(0, result.size());
        assertTrue(result.isEmpty());
        verify(roomTypeRepository, times(1)).getAll();
        verify(roomTypeMapper, times(1)).roomTypesToRoomTypeDTOs(emptyRoomTypes);
    }

    @Test
    void saveRoomTypeWithFieldAlreadyExistsException_VerifySaveNotCalled() {
        // Arrange
        RoomTypeDTO inputDTO = new RoomTypeDTO();
        inputDTO.setDescription("Existing Lecture Hall");

        when(roomTypeRepository.countRoomTypesWithDescription("Existing Lecture Hall")).thenReturn(1L);

        // Act & Assert
        assertThrows(FieldAlreadyExistsException.class, () -> roomTypeService.save(inputDTO));

        // Verify that save was never called
        verify(roomTypeRepository, times(1)).countRoomTypesWithDescription("Existing Lecture Hall");
        verify(roomTypeMapper, never()).roomTypeDTOTRoomType(any(RoomTypeDTO.class));
        verify(roomTypeRepository, never()).save(any(RoomType.class));
        verify(roomTypeMapper, never()).roomTypeToRoomTypeDTO(any(RoomType.class));
    }

    @Test
    void deleteByIdWithEntityNotFoundException_VerifyDeleteNotCalled() {
        // Arrange
        Long nonExistentId = 999L;
        when(roomTypeRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(EntityNotFoundException.class, () -> roomTypeService.deleteById(nonExistentId));

        // Verify that delete was never called
        verify(roomTypeRepository, times(1)).findById(nonExistentId);
        verify(roomTypeRepository, never()).delete(any(RoomType.class));
    }

    @Test
    void getAllRoomTypesMultipleResults() {
        // Arrange
        RoomType roomType2 = new RoomType();
        roomType2.setId(2L);
        roomType2.setDescription("Seminar Room");

        RoomType roomType3 = new RoomType();
        roomType3.setId(3L);
        roomType3.setDescription("Lab Room");

        List<RoomType> roomTypes = List.of(roomType, roomType2, roomType3);

        RoomTypeDTO roomTypeDTO2 = new RoomTypeDTO();
        roomTypeDTO2.setId(2L);
        roomTypeDTO2.setDescription("Seminar Room");

        RoomTypeDTO roomTypeDTO3 = new RoomTypeDTO();
        roomTypeDTO3.setId(3L);
        roomTypeDTO3.setDescription("Lab Room");

        List<RoomTypeDTO> roomTypeDTOs = List.of(roomTypeDTO, roomTypeDTO2, roomTypeDTO3);

        when(roomTypeRepository.getAll()).thenReturn(roomTypes);
        when(roomTypeMapper.roomTypesToRoomTypeDTOs(roomTypes)).thenReturn(roomTypeDTOs);

        // Act
        List<RoomTypeDTO> result = roomTypeService.getAll();

        // Assert
        assertNotNull(result);
        assertEquals(3, result.size());
        assertEquals(roomTypeDTO.getDescription(), result.get(0).getDescription());
        assertEquals(roomTypeDTO2.getDescription(), result.get(1).getDescription());
        assertEquals(roomTypeDTO3.getDescription(), result.get(2).getDescription());
        verify(roomTypeRepository, times(1)).getAll();
        verify(roomTypeMapper, times(1)).roomTypesToRoomTypeDTOs(roomTypes);
    }
}
