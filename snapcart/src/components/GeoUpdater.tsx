'use client'
import { getSocket } from '@/lib/socket'
import React, { useEffect } from 'react'

const GeoUpdater = ({ userId } : { userId:string }) => {
    let socket = getSocket()
    socket.emit("identity", userId)

    useEffect(() => {
        if (!userId) null
        if (!navigator.geolocation) return
        const watcher = navigator.geolocation.watchPosition((pos)=>{
            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            socket.emit("update-location", {
                userId,
                latitude:lat,
                longitude:lon
            })
        }, (error) => {
            console.log(error)
        }, { enableHighAccuracy:true })
        return () => navigator.geolocation.clearWatch(watcher)
    }, [userId])
    
    return null
}

export default GeoUpdater
