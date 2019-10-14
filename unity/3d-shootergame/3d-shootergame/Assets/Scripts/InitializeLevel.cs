using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InitializeLevel : MonoBehaviour
{
    public GameObject tree;
    public int treeNumber;

    // Start is called before the first frame update
    void Start()
    {
        Vector3 size = GetComponent<Renderer>().bounds.size;

        for (int i = 0; i < treeNumber; i++)
        {
            var positionX = UnityEngine.Random.Range((float)-0.5*size.x, (float)0.5*size.x);
            var positionZ = UnityEngine.Random.Range((float)-0.5*size.z, (float)0.5*size.z);
            Instantiate(tree, new Vector3(positionX, 0, positionZ), Quaternion.identity);
        }
    }
}
