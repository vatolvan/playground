using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveBomb : MonoBehaviour
{
    public float speed;

    public void FixedUpdate()
    {
        Rigidbody rigidBody = GetComponent<Rigidbody>();

        rigidBody.position = rigidBody.position + new Vector3(0, -1, 0) * Time.deltaTime * speed;
    }
}
