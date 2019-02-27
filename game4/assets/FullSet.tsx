<?xml version="1.0" encoding="UTF-8"?>
<tileset name="FullSet" tilewidth="40" tileheight="40" tilecount="5" columns="5">
 <image source="tiles.png" width="200" height="40"/>
 <tile id="0">
  <properties>
   <property name="collision" type="bool" value="true"/>
   <property name="death" type="bool" value="false"/>
  </properties>
  <objectgroup draworder="index">
   <properties>
    <property name="collision" type="bool" value="true"/>
    <property name="death" type="bool" value="false"/>
   </properties>
  </objectgroup>
 </tile>
 <tile id="1">
  <properties>
   <property name="collision" type="bool" value="false"/>
   <property name="death" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <properties>
    <property name="collision" type="bool" value="false"/>
    <property name="death" type="bool" value="true"/>
   </properties>
   <object id="2" x="0.333333" y="39.6667">
    <polygon points="0,0 20.3333,-39.6667 40,0.333333"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="2">
  <properties>
   <property name="collision" type="bool" value="false"/>
   <property name="death" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <properties>
    <property name="collision" type="bool" value="false"/>
    <property name="death" type="bool" value="true"/>
   </properties>
   <object id="1" x="0.333333" y="0.666667">
    <polygon points="0,0 20,40 39.6667,-0.333333"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="3">
  <properties>
   <property name="collision" type="bool" value="false"/>
   <property name="death" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <properties>
    <property name="collision" type="bool" value="false"/>
    <property name="death" type="bool" value="true"/>
   </properties>
   <object id="1" x="40.3333" y="0.666667">
    <polygon points="0,0 -40,19.6667 0,40.3333"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="4">
  <properties>
   <property name="collision" type="bool" value="false"/>
   <property name="death" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index">
   <properties>
    <property name="collision" type="bool" value="false"/>
    <property name="death" type="bool" value="true"/>
   </properties>
   <object id="1" x="0" y="0.666667">
    <polygon points="0,0 40,19.3333 0,39.6667"/>
   </object>
  </objectgroup>
 </tile>
</tileset>
