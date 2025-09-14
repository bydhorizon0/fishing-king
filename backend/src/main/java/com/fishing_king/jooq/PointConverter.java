package com.fishing_king.jooq;

import org.jooq.Converter;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;
import org.locationtech.jts.io.WKTWriter;

public class PointConverter implements Converter<Object, Point> {

    private static final GeometryFactory GEOMETRY_FACTORY =
            new GeometryFactory(new PrecisionModel(), 4326);
    private static final WKTReader WKT_READER = new WKTReader(GEOMETRY_FACTORY);
    private static final WKTWriter WKT_WRITER = new WKTWriter();

    @Override
    public Point from(Object databaseObject) {
        if (databaseObject == null) {
            return null;
        }

        try {
            // MySQL POINT는 바이트 배열로 반환될 수 있으므로 처리
            if (databaseObject instanceof byte[]) {
                // MySQL의 바이너리 형태를 처리하려면 추가 로직 필요
                // 일단 간단한 WKT 파싱으로 처리
                String wkt = new String((byte[]) databaseObject);
                return (Point) WKT_READER.read(wkt);
            } else if (databaseObject instanceof String) {
                String wkt = (String) databaseObject;
                return (Point) WKT_READER.read(wkt);
            }

            // 다른 형태의 데이터 처리
            return (Point) WKT_READER.read(databaseObject.toString());
        } catch (ParseException e) {
            throw new RuntimeException("Failed to parse Point from database: " + databaseObject, e);
        }
    }

    @Override
    public Object to(Point userObject) {
        if (userObject == null) {
            return null;
        }

        return WKT_WRITER.write(userObject);
    }

    @Override
    public Class<Object> fromType() {
        return Object.class;
    }

    @Override
    public Class<Point> toType() {
        return Point.class;
    }
}
