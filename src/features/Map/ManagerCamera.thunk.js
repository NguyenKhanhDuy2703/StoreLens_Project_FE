import {createAsyncThunk} from '@reduxjs/toolkit'
import { getListCamerasWithZones , postZoneforCamera } from "../../services/cameraManagement";
export const fetchCamerasWithZones = createAsyncThunk(
    'cameras/fetchCamerasWithZones',
    async (storeId, thunkAPI) => {
        
        try {
            const response = await getListCamerasWithZones(storeId);
            const cameras = response?.map ( (cam) => {
                return {
                    storeId : cam.store_id,   
                    cameraCode : cam.camera_code,
                    cameraName : cam.camera_name,
                    cameraSpec : cam.camera_spec,
                    status : cam.status,
                    location : cam.location,
                    installationDate : cam.installation_date,
                    maintenanceDate : cam.maintenance_date,
                    rtspUrl : cam.rtsp_url,
                }
            })
            const zones = response?.map ( (item) => {
                if(!item.zones_info) {
                    return {
                        cameraCode : item.camera_code,
                        backgroundImage : "",
                        widthFrame : 0,
                        heightFrame : 0,
                        zones : []
                    }

                }
                return {
                    cameraCode : item.camera_code,
                    backgroundImage : item?.zones_info?.background_image || "",
                    widthFrame : item.zones_info.width_frame,
                    heightFrame : item.zones_info.height_frame,
                    zones : item.zones_info.zones.map( (z)=> {
                        return{
                            zoneId : z.zone_id,
                            zoneName : z.zone_name,
                            categoryName : z.category_name,
                            color : z.color,
                            coordinates : z.coordinates,
                        }
                    })
                }
            } )
            
            return {cameras , zones};
            
        } catch (error) {
            console.error("Error fetching cameras with zones:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export  const fetchAddZoneForCamera = createAsyncThunk(
    'cameras/fetchAddZoneForCamera',
    async ( zoneData , thunkAPI) => {
        try {
            
            const tranferData = {
                cameraCode : zoneData.cameraCode,
                zones : {
                    background_image : zoneData.backgroundImage,
                    width_frame : zoneData.widthFrame,
                    height_frame : zoneData.heightFrame,
                    zones : JSON.stringify(
                        zoneData.zones.map( (z) => {
                        return {
                            zone_id : z.zoneId,
                            zone_name : z.zoneName,
                            category_name : z.categoryName,
                            color : z.color,
                            coordinates : z.coordinates,
                        }
                    })
                    )
                }
            }
            const response = await postZoneforCamera(tranferData);
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);