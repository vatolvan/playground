using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveBomb : MonoBehaviour
{
    public float speed;
    private Rigidbody _rigidBody;

    private void Start()
    {
        _rigidBody = GetComponent<Rigidbody>();
    }

    public void FixedUpdate()
    {
        _rigidBody.position = _rigidBody.position + new Vector3(0, -1, 0) * Time.deltaTime * speed;
    }
}
