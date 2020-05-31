import { peerState } from './types'
import conn from './conn';

export default class {

    public readonly state: peerState;
    private conn: conn;
    constructor(private readonly id: string, private passive: boolean, private readonly servers: RTCConfiguration) {
        this.state = peerState.READY
        this.conn = new conn(id, servers)
        console.info("new peer")
    }

    public connect() {
        this.passive = false
        this.conn.connect()
    }

    public waitForConnect() {
        this.passive = true
    }

    public onOffer(sdp: RTCSessionDescription) {
        this.conn.onOffer(sdp)
    }

    public onAnswer(sdp: RTCSessionDescription) {
        this.conn.onAnswer(sdp)
    }

    public onCandidate(candidate: RTCIceCandidate) {
        this.conn.onCandidate(candidate)
    }

    send(data: any) {
        return this.conn.send(data)
    }

}
