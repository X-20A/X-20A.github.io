import axios from "axios";

export async function get_ACSim_master_data(): Promise<any> {
    // Cors回避のために別途プロキシサーバを起動してから
    const response = await axios.get(
        'http://localhost:3000/ac-master'
    );
    if (
        response.status !== 200
    ) throw new Error('通信失敗');

    return response.data;
}