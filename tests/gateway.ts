import axios from "axios";

const PROXY_PORT = 'http://localhost:3000';

export async function get_ACSim_master_data(): Promise<any> {
    // Cors回避のために別途プロキシサーバを起動してから
    const response = await axios.get(
        `${PROXY_PORT}/ac-master`
    );
    if (
        response.status !== 200
    ) throw new Error('通信失敗');

    return response.data;
}

export async function get_zekamashi_article_title(
    id: string,
): Promise<string> {
    const response = await axios.get(
        `${PROXY_PORT}/zekamashi/?id=${id}`
    );
    if (
        response.status !== 200
    ) throw new Error('通信失敗');

    return response.data;
}