package com.fishing_king.service;

import com.fishing_king.repository.fish.FishPointRepository;
import lombok.extern.log4j.Log4j2;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class FishPointService {

    // 근데 이 4326이 뭐지?
    private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
    private final FishPointRepository fishPointRepository;

    public FishPointService(FishPointRepository fishPointRepository) {
        this.fishPointRepository = fishPointRepository;
    }

    public void saveMarker() {
        Point point = geometryFactory.createPoint(new Coordinate(/*lon, lan*/));
        point.setSRID(4326);

    }

}
