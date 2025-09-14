package com.fishing_king.core.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.locationtech.jts.geom.Point;

@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class FishPoint extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    @Column(columnDefinition = "POINT")
    @JdbcTypeCode(SqlTypes.GEOMETRY)
    private Point location;

    private Long userId;

    private Long fishDataId;

    private Boolean isPrivate;

}
