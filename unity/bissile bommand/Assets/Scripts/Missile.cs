using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class Missile : MonoBehaviour
{
    public float speed;
    public float targetX;
    public float targetY;

    public GameObject explosion;

    // Update is called once per frame
    void Update()
    {
        var o = gameObject;
        Vector3 position = o.transform.position;

        Vector2 v = new Vector2(targetX - position.x, targetY - position.y);
        float dist = v.magnitude;
        v.Normalize();

        float stepSize = Math.Min(Time.deltaTime * speed, dist);
        float dx = stepSize * v.x;
        float dy = stepSize * v.y;

        if (dx < Single.Epsilon && dy < Single.Epsilon)
        {
            Instantiate(explosion, position, Quaternion.identity);
            Destroy(gameObject);
        }


        position.x += dx;
        position.y += dy;

        o.transform.position = position;
    }
}