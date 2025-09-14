package com.fishing_king.service;

import lombok.extern.log4j.Log4j2;
import org.jooq.DSLContext;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class FishPointQueryService {

    private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
    private final DSLContext dsl;

    public FishPointQueryService(DSLContext dsl) {
        this.dsl = dsl;
    }

//    public MarkerResponse getMarker(Long id) {
//        return dsl.select(
//                        FishPoint.FISH_POINT.ID,
//                        FishPoint.FISH_POINT.USER_ID,
//                        FishPoint.FISH_POINT.FISH_DATA_ID,
//                        FishPoint.FISH_POINT.TITLE,
//                        DSL.field("ST_X({0})", Double.class, FishPoint.FISH_POINT.LOCATION).as("longitude"),
//                        DSL.field("ST_Y({0})", Double.class, FishPoint.FISH_POINT.LOCATION).as("latitude"),
//                        FishPoint.FISH_POINT.IS_PRIVATE,
//                        FishPoint.FISH_POINT.CREATED_AT,
//                        FishPoint.FISH_POINT.UPDATED_AT
//                )
//                .from(FishPoint.FISH_POINT)
//                .where(FishPoint.FISH_POINT.ID.eq(id))
//                .fetchOne(record -> new MarkerResponse(
//                        record.get(FishPoint.FISH_POINT.ID, Long.class),
//                        record.get(FishPoint.FISH_POINT.USER_ID),
//                        record.get(FishPoint.FISH_POINT.FISH_DATA_ID),
//                        record.get(FishPoint.FISH_POINT.TITLE),
//                        record.get("latitude", Double.class),
//                        record.get("longitude", Double.class),
//                        record.get(FishPoint.FISH_POINT.IS_PRIVATE, Boolean.class),
//                        record.get(FishPoint.FISH_POINT.CREATED_AT, LocalDateTime.class),
//                        record.get(FishPoint.FISH_POINT.UPDATED_AT, LocalDateTime.class)
//                ));
//    }

}
