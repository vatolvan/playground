using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMovement : MonoBehaviour
{
    public GameObject player;
    public float cameraHeight;

    // Update is called once per frame
    void Update()
    {
        Vector3 playerPosition = player.transform.position;
        gameObject.transform.position = new Vector3(playerPosition.x, cameraHeight, playerPosition.z);
    }
}
