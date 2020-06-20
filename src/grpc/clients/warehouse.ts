import * as grpc from 'grpc';
import { WarehouseAndMaterialsClient, IWarehouseAndMaterialsClient } from '../../proto/warehouse_grpc_pb';
import {
    ChangeMaterialItemsStateRequest,
    CheckOrderSpecsAndSetMaterialsRequest,
    CheckOrderSpecsAndSetMaterialsResponse,
    ChangeMaterialItemsStateResponse
} from '../../proto/warehouse_pb';
import {config} from "../../config";

class WarehouseGrpcClient  {
    warehouseClient: IWarehouseAndMaterialsClient;

    constructor() {
        this.warehouseClient = new WarehouseAndMaterialsClient(config.warehouseServiceGrpcUrl!, grpc.credentials.createInsecure());
    }

    checkOrderSpecsAndSetMaterials(input: CheckOrderSpecsAndSetMaterialsRequest): Promise<boolean> {
        return new Promise((resolve ,reject) => {
            this.warehouseClient.checkOrderSpecsAndSetMaterials(
                input,
                (error: (grpc.ServiceError | null), response: CheckOrderSpecsAndSetMaterialsResponse) => {
                    if (error != null) {
                        reject(error);
                        return;
                    }

                    resolve(response.getCheckpassed());
                });
        });
    }

    changeMaterialItemsState(input: ChangeMaterialItemsStateRequest): Promise<boolean> {
        return new Promise((resolve ,reject) => {
            this.warehouseClient.changeMaterialItemsState(
                input,
                (error: (grpc.ServiceError | null), response: ChangeMaterialItemsStateResponse) => {
                    if (error != null) {
                        reject(error);
                        return;
                    }

                    resolve(response.getStatechangecompleted());
                });
        });
    }
}

export default new WarehouseGrpcClient();
